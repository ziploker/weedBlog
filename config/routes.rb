Rails.application.routes.draw do
  #get 'hello_world', to: 'hello_world#index'
  
  
  
  
  # For details on the DSL available within this file, see https://guides.rubyonrails.org/routing.html


  resources :stories do
    resources :comments
  end

  resources :comments do
    resources :comments
  end
  
  resources :sessions, only: [:create]
  resources :registrations, only: [:create], param: :confirm_token do
    member do
      get :confirm_email
    end
  end

  resources :registrations, only: [:update]
  

  delete :logout, to: "sessions#logout"
  get :logged_in, to: "sessions#logged_in"
  post '/lookup', to: 'lookups#incoming'
  post '/:page', to: 'landings#next_page'
  put '/registrations/:id', to: 'registrations#update'

  post '/registrations/forgot', to: 'registrations#forgot'
  post '/registrations/resend', to: 'registrations#resend'
  post '/registrations/:token/reset', to: 'registrations#reset', as: 'registrations_reset'
  post '/blog/get_article_info', to: 'landings#get_article_info'
  
  get '/ziploker/edit/:id', to: 'stories#edit'
  get '/ziploker', to: 'stories#new'
  #get '/login', to: 'sessions#login'
  
  root to: 'landings#index'

  match '*path', to: 'landings#index', via: :all
end
