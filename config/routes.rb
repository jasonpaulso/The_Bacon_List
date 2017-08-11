Rails.application.routes.draw do
  root 'pages#index'

  namespace :api do 
    namespace :v1 do 
      resources :jobs, only: [:index, :show, :create, :destroy, :update] 
    end 
  end
  
  get '*path', to: 'pages#index'


  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html

 
end
