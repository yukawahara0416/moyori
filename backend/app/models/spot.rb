class Spot < ApplicationRecord
  belongs_to :user
  has_many :likes, dependent: :destroy
  has_many :liked_users, through: :likes, source: :user
  has_many :wifi_with, dependent: :destroy
  has_many :wifi_with_users, through: :wifi_with, source: :user
  validates :place_id, uniqueness: true
end
