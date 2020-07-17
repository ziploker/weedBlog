class SessionsController < ApplicationController
    
    #sets @current_user if session[:id] exists
    include CurrentUserConcern
    
    
    
    
    ####################  LOGIN  ###############################
    
    def create   
        
        
        # search for user email and try to auth...
        user = User
            .find_by(email: params["user"]["email"].downcase)
            .try(:authenticate, params["user"][:password])

        
        if user.present?
            
            if user.email_confirmed
                
                session[:user_id] = user.id
                render json:{
                    
                    status: "green",
                    logged_in: true,
                    user: user,
                    error: {success: ["You have successfully logged in !!"]}
                }
            else
                render json: {
                    status: "pink", 
                    error: {auth: ["Account not active yet, check email and click link"]}
                }
            end

        else
            render json: {
                status: "pink", 
                error: {auth: ["Email or password is bad."]}
            }
        end
    end

    ################# check if user is logged in ###########
    def logged_in

        if @current_user
            
            render json: {
                
                logged_in: true,
                user: @current_user
            }
        else
            render json: {
                logged_in: false
            }
        end
    end

    
    ################# Log user da fk out ###########
    def logout
        reset_session
        render json: {
            
            status: 200, 
            logged_out: true
        }
    end
end
