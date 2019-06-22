Rails.application.routes.draw do
  root to: 'static_pages#home'

  get '/about', to: 'static_pages#about'

  devise_for :users

  namespace :api do
    namespace :v1 do
     resources :entries, except: [:index, :new, :show, :edit]
     resources :current_user_entries, only: :index
    end
  end
end
