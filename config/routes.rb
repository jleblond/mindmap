Rails.application.routes.draw do

  # devise_for :users

  devise_for :users, skip: :registrations

  devise_scope :user do
    get '/users/sign_out' => 'users/sessions#destroy'
  end

  devise_scope :user do
    resource :registration,
             only: [:new, :create, :edit, :update],
             path: 'users',
             path_names: { new: 'sign_up' },
             controller: 'users/registrations',
             as: :user_registration do
      get :cancel
    end
  end



  # For details on the DSL available within this file, see https://guides.rubyonrails.org/routing.html
  root to: "home#index"
  resources :diagrams do
    resource :canvas
  end

end
