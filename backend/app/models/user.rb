# frozen_string_literal: true

class User < ActiveRecord::Base
  devise :database_authenticatable, :registerable,
         :recoverable, :rememberable, :trackable, :validatable,
         :omniauthable, omniauth_providers: [:twitter]
  include DeviseTokenAuth::Concerns::User

  has_many :spots, dependent: :destroy
  has_many :likes, dependent: :destroy
  has_many :liked_spots, through: :likes, source: :spot
  has_many :wifi_withs, dependent: :destroy
  has_many :wifi_with_spots, through: :wifi_withs, source: :spot
  has_many :wifi_withouts, dependent: :destroy
  has_many :wifi_without_spots, through: :wifi_withouts, source: :spot
  has_many :power_withs, dependent: :destroy
  has_many :power_with_spots, through: :power_withs, source: :spot
  has_many :power_withouts, dependent: :destroy
  has_many :power_without_spots, through: :power_withouts, source: :spot
  validates :name, presence: true
end
