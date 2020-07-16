class RegistrationsController < ApplicationController

    require 'sendgrid-ruby'
    include SendGrid

   

    def create
        
        sendgrid_api = Rails.application.credentials.dig(:SENDGRID_API)
        token = SecureRandom.urlsafe_base64.to_s
        @user = User.create!(
            first: params['user']['first'],
            last: params['user']['last'],
            email: params['user']['email'].downcase,
            password: params['user']['password'],
            password_confirmation: params['user']['password_confirmation'],
            
            confirm_token: token
            
        )

        if @user

            
            
            #UserMailer.registration_confirmation(@user).deliver

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
                        <em>-Weedbog Team</em></p>

                    </body>
                </html>'))
                    
                    
                

            #email.template_id = "6ede18bb-2eba-4958-8a57-43a58a559a0a"
            sg = SendGrid::API.new(api_key: sendgrid_api)

            response = sg.client.mail._('send').post(request_body: email.to_json)

            puts response.status_code.to_s

            puts response.body.to_s

            puts response.headers.to_s
            
            
            
            
            
            #from = Email.new(email: 'admin@weedblog.com')
            #to = Email.new(email: @user.email)
            #subject = 'Thank you for signing up to the Weed'
            #content = Content.new(type: "text/plain", value: "some text here")
            #content = Content.new(type: "text/html", value: "<html><body>some text here</body></html>")
            #content = Content.new(type: 'text/plain', value: 'and easy to do anywhere, even with Ruby')
            #mail = Mail.new(from, subject, to, content)

            #sg = SendGrid::API.new(api_key: sendgrid_api)
            #response = sg.client.mail._('send').post(request_body: mail.to_json)
            #puts "111111111111! = " + response.status_code.to_s
            #puts "22222222222222 = " + response.body.to_s
            #puts "333333333333 = " + response.headers.to_s
            #@user = user
            #mail(:to => user.email, :subject => "Registration Confirmation")
            
            
            session["user_id"] = @user.id
            render json: {

                message: "Please confirm your email address to continue",
                status: :created,
                user: @user
            }
        else
            render json: {
                status: 500,
                message: 'something went wrong'
            
            }
        end
    end

    def confirm_email

        
        @user = User.find_by_confirm_token(params[:confirm_token])
        if @user
            @user.email_confirmed = true
            @user.confirm_token = nil
            @user.save!(:validate => false)
            
          puts "Welcome to the Sample App! Your email has been confirmed.
          Please sign in to continue."
          
        else
          puts "Sorry. User does not exist"
          
        end
    end


    def update
        puts 'inController'

        @user = User
            .find_by(id: params[:id])
            .try(:authenticate, params["user"][:oldPassword])

        if @user
            if @user.email_confirmed
                #session[:user_id] = user.id
                
                
                
                if @user.update(user_params)
                
                    render json:{
                        status: "green",
                        logged_in: true,
                        user: @user,
                        error: { green: ["Changes saved!"]}
                    }
                else
                    render json:{
                        status: "pink",
                        logged_in: true,
                        user: @user,
                        error: @user.errors.messages
                    }

                end
            
            
            
            
            
            else
                render json: {
                    status: "pink", 
                    error: "Account not active yet, check email and click link"
                }
            end

        else
            render json: {
                status: "pink", 
                error: { auth: ["Current password isn't right"]}
            }
        end
    end
       
    #reject { |_, v| v.blank? }

    def user_params
        if params[:email]
            params[:email].downcase
        end
        params.require(:user).permit(:first, :last, :email, :password_digest, :password, :password_confirmation, :email_confirmed, :confirm_token)
      end
end


