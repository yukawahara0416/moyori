# frozen_string_literal: true

class User < ActiveRecord::Base
  devise :database_authenticatable, :registerable,
         :recoverable, :rememberable, :trackable, :validatable,
         :omniauthable, omniauth_providers: [:twitter]
  include DeviseTokenAuth::Concerns::User

  has_many :spots, dependent: :destroy
  has_many :likes, dependent: :destroy
  has_many :liked_spots, through: :likes, source: :spot
  validates :name, presence: true
end
