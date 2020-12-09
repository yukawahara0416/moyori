# frozen_string_literal: true

Rails.application.routes.draw do
  devise_for :admin_users, ActiveAdmin::Devise.config
  ActiveAdmin.routes(self)

  namespace :api, format: 'json' do
    namespace :v1 do
      mount_devise_token_auth_for 'User', at: 'auth', controllers: {
        registrations: 'api/v1/auth/registrations',
        omniauth_callbacks: 'api/v1/auth/omniauth_callbacks'
      }
      resources :users, only: [:show]
      resources :spots, only: [:show, :create, :update, :destroy] do
        get 'collate', on: :collection
        get 'nearby', on: :collection
      end
      resources :likes, only: [:create, :destroy]
      resources :wifi_withs, only: [:create, :destroy]
      resources :wifi_withouts, only: [:create, :destroy]
      resources :power_withs, only: [:create, :destroy]
      resources :power_withouts, only: [:create, :destroy]
      resources :comments, only: [:create, :destroy]
    end
  end
end
