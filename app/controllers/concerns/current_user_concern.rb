module CurrentUserConcern
    extend ActiveSupport::Concern

    included do
        before_action :set_current_user
    end

    def set_current_user
        puts 'in set current user =============================='
        if session[:user_id]
            puts 'in session[:user_id] =============================='
            puts 'session[:user_id] is ' + session[:user_id].to_s
            @current_user = User.find(session[:user_id])
            puts '@current_user = ' + @current_user.inspect
        end
    end
end