Rails.application.routes.draw do

  root 'pages#index'

  namespace :api do 
    namespace :v1 do 
      resources :jobs, only: [:index, :show, :create, :destroy, :update] 
    end 
  end
  
  get '*path', to: 'pages#index'
 
end
