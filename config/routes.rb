Rails.application.routes.draw do
  root to: 'main_pages#home'

  get '/about', to: 'main_pages#about'

  devise_for :users

  namespace :api do
    namespace :v1 do
     resources :entries, except: [:index, :new, :show, :edit]
     resources :current_user_entries, only: :index
    end
  end
end
