class SessionsController < ApplicationController
    include CurrentUserConcern
    
    #logging in logic
    def create   
        #email = params["user"]["email"].downcase
        #puts "email is =========== " + email
        user = User
            .find_by(email: params["user"]["email"].downcase)
            .try(:authenticate, params["user"][:password])

        if user
            if user.email_confirmed
                session[:user_id] = user.id
                render json:{
                    status: "green",
                    logged_in: true,
                    user: user
                }
            else
                render json: {
                    status: "pink", 
                    error: "Account not active yet, check email and click link"
                }
            end

        else
            render json: {
                status: "pink", 
                error: "bad email or password"
            }
        end
    end

    #like devise userLoggedIn? feature
    def logged_in

        if @current_user
            render json: {
                controller: "sessions",
                logged_in: true,
                user: @current_user
            }
        else
            render json: {
                logged_in: false
            }
        end
    end


    def logout
        reset_session
        render json: {status: 200, logged_out: true}
    end
end
