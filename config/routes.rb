Rails.application.routes.draw do
  #get 'hello_world', to: 'hello_world#index'
  
  
  
  
  # For details on the DSL available within this file, see https://guides.rubyonrails.org/routing.html


  resources :stories

  root to: 'landings#index'

  match '*path', to: 'landings#index', via: :all
end
