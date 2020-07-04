if Rails.env == "development"

    
    Rails.application.config.session_store :cookie_store, key: "_autentication_app"
else
    Rails.application.config.session_store :cookie_store, key: "_autentication_app", secure: true, domain: :all
end