if Rails.env == "production"
    Rails.application.config.session_store :cookie_store, key: "_autentication_app", secure: true, domain: :all
else
    Rails.application.config.session_store :cookie_store, key: "_autentication_app"
end