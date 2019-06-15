Rails.application.routes.draw do
  root to: 'static_pages#home'

  get '/about', to: 'static_pages#about'

  devise_for :users

  namespace :api do
    namespace :v1 do
     resources :entries, except: [:new, :show, :edit]
     resources :users, only: :show
    end
  end
end
