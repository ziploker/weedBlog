if Rails.env == "development"

    
    Rails.application.config.session_store :cookie_store, key: "_autentication_app", :expire_after => 60.minutes
else
    Rails.application.config.session_store :cookie_store, key: "_autentication_app", :expire_after => 60.minutes
end