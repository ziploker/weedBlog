if Rails.env == "production"
    Rails.application.config.session_store :cookie_store, key: "_autentication_app", domain: "weedblog.ziploker.herokuapp.com"
else
    Rails.application.config.session_store :cookie_store, key: "_autentication_app"
end