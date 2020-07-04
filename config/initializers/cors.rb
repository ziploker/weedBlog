
Rails.application.config.action_controller.forgery_protection_origin_check = false
Rails.application.config.middleware.insert_before 0, Rack::Cors do
    allow do
      origins 'localhost:3000', 'localhost:8080', 'weedblog.herokuapp.com'
  
      resource '*',
        headers: :any,
        methods: [:get, :post, :put, :patch, :delete, :options, :head],
        credentials: true
    end
  end
  
  