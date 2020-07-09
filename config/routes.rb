Rails.application.routes.draw do
  #get 'hello_world', to: 'hello_world#index'
  
  
  
  
  # For details on the DSL available within this file, see https://guides.rubyonrails.org/routing.html


  resources :stories
  resources :sessions, only: [:create]
  resources :registrations, only: [:create], param: :token do
    member do
      get :confirm_email
    end
  end
  

  delete :logout, to: "sessions#logout"
  get :logged_in, to: "sessions#logged_in"
  post '/lookup', to: 'lookups#incoming'
  
  root to: 'landings#index'

  match '*path', to: 'landings#index', via: :all
end
