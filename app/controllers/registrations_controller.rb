class RegistrationsController < ApplicationController

    require 'sendgrid-ruby'
    include SendGrid

    #sets @current_user if session[:id] exists
    include CurrentUserConcern

   
    ####################  SIGN_UP  ###############################
    def create
        
        sendgrid_api = Rails.application.credentials.dig(:SENDGRID_API)
        token = SecureRandom.urlsafe_base64.to_s
        
        @user = User.new(user_params)
        @user.confirm_token = token

        
        
        

        if @user.save

            # using SendGrid's Ruby Library
            # https://github.com/sendgrid/sendgrid-ruby
            
            email = SendGrid::Mail.new
            email.from = Email.new(email: 'admin@weedblog.com', name: "Weedblog Team")
            
            email.subject = "Welcome to weedBlog"

            per = Personalization.new

            per.add_to(Email.new(email: @user.email, name: @user.email))
            #per.add_cc(Email.new(email: @user.email, name: 'cc'))
            #per.add_bcc(Email.new(email: @user.email, name: 'bcc'))
            per.add_substitution(Substitution.new(key: "user_name", value: @user.first))

            per.add_substitution(Substitution.new(key: "reset_link", value: confirm_email_registration_url(@user.confirm_token)))

            email.add_personalization(per)

            #email.add_content(Content.new(type: 'text/plain', value: 'some text here user_name'))
            email.add_content(Content.new(type: 'text/html', value: '
                
                <html>
                    <body>
                        <h1> Hi user_name,</h1>
                        <p> Thank you for registering at weedBlog<br>
                        Please click on the link below to activate your account<br><br>

                        reset_link<br></p>

                        <p>Thank you,<br>
                        <em>-Weedblog Team</em></p>

                    </body>
                </html>'))
                    
                    
                

            #email.template_id = "6ede18bb-2eba-4958-8a57-43a58a559a0a"
            sg = SendGrid::API.new(api_key: sendgrid_api)

            response = sg.client.mail._('send').post(request_body: email.to_json)

            puts response.status_code.to_s
            puts response.body.to_s
            puts response.headers.to_s
            
            
            session["user_id"] = @user.id
            
            render json: {

                
                status: :created,
                user: @user,
                error: {auth: ["Success!!! click the link in the email we sent you."]}
            }
        
        else
            
            if @user.errors.messages
                render json: {
                
                    status: 500,
                    error: {auth: [@user.errors.full_messages[0]]}
                
                }
            else
                render json: {
                    
                    status: 500,
                    error: {auth: ["something went wrong"]}
                
                }
            end
        end
    end

    
    
    
    ####################  when they click the link in the email  ##########
    def confirm_email

        
        @user = User.find_by_confirm_token(params[:confirm_token])
        
        if @user.present?
            
            @user.email_confirmed = true
            @user.confirm_token = nil
            @user.save!(:validate => false)
            
            puts "Your email has been confirmed, please sign in to continue."
          
        else
            
            puts "Sorry. can't find account."
          
        end
    end


    ####################  when they edit account details  ##########
    def update
        
        @user = User
            .find_by(id: params[:id])
            .try(:authenticate, params["user"][:oldPassword])

        if @user.present?
            
            if @user.email_confirmed
            
                
                #if email is being updated, send confirmation to new email
                if @user.email.downcase != params["user"][:email].downcase

                    @user.email_confirmed = false
                    token = SecureRandom.urlsafe_base64.to_s
                    @user.confirm_token = token
                    @user.email = params["user"][:email].downcase
                    
                    #if names are different, save new names
                    if (@user.first != params["user"][:first] && !params["user"][:first].blank?)
                        @user.first = params["user"][:first]
                    end

                    if (@user.last != params["user"][:last] && !params["user"][:last].blank?)
                        @user.last = params["user"][:last]
                    end
                    
                    @user.save!
                    
                    sendgrid_api = Rails.application.credentials.dig(:SENDGRID_API)
                    email = SendGrid::Mail.new
                    email.from = Email.new(email: 'admin@weedblog.com', name: "Weedblog Team")
                    
                    email.subject = "**weedBlog email change request"

                    per = Personalization.new

                    per.add_to(Email.new(email: @user.email, name: @user.email))
                    #per.add_cc(Email.new(email: @user.email, name: 'cc'))
                    #per.add_bcc(Email.new(email: @user.email, name: 'bcc'))
                    per.add_substitution(Substitution.new(key: "user_name", value: @user.first))

                    per.add_substitution(Substitution.new(key: "reset_link", value: confirm_email_registration_url(@user.confirm_token)))

                    email.add_personalization(per)

                    #email.add_content(Content.new(type: 'text/plain', value: 'some text here user_name'))
                    email.add_content(Content.new(type: 'text/html', value: '
                        
                        <html>
                            <body>
                                <h1> Hi user_name,</h1>
                                <p> Thank you for updating your email at weedBlog<br>
                                Please click on the link below to finalize the email change<br><br>

                                reset_link<br></p>

                                <p>Thank you,<br>
                                <em>-Weedbog Team</em></p>

                            </body>
                        </html>'))
                            
                            
                        

                    #email.template_id = "6ede18bb-2eba-4958-8a57-43a58a559a0a"
                    sg = SendGrid::API.new(api_key: sendgrid_api)

                    response = sg.client.mail._('send').post(request_body: email.to_json)

                    puts response.status_code.to_s
                    puts response.body.to_s
                    puts response.headers.to_s

                    session["user_id"] = @user.id
                    
                    render json: {

                        status: :created,
                        user: @user,
                        error: { auth: ["Please click the link in the email we sent you."]}
                    }

                    return
                end
                
                
                
                
                if @user.update(user_params)
                
                    render json:{
                        status: "green",
                        logged_in: true,
                        user: @user,
                        error: { success: ["Changes saved!"]}
                    }
                else
                    render json:{
                        status: "pink",
                        logged_in: true,
                        user: @user,
                        error: {auth: [@user.errors.full_messages[0]]}
                    }

                end
            
            else
                
                render json: {
                    status: "pink", 
                    error: { auth: ["Account not active yet, check email and click link"]}
                }
            end

        
        else
            render json: {
                status: "pink", 
                error: { auth: ["Current password is wrong. "]}
            }
        end
    end
       
   
    
    
    private

    def user_params
        
        if params[:email]
            params[:email].downcase
        end
        
        params.require(:user).permit(:first, :last, :email, :password_digest, :password, :password_confirmation, :email_confirmed, :confirm_token)
    end

end


