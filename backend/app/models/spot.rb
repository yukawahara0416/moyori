class Spot < ApplicationRecord
  belongs_to :user
  has_many :likes, dependent: :destroy
  has_many :liked_users, through: :likes, source: :user
  has_many :wifi_withs, dependent: :destroy
  has_many :wifi_with_users, through: :wifi_withs, source: :user
  has_many :wifi_withouts, dependent: :destroy
  has_many :wifi_without_users, through: :wifi_withouts, source: :user
  has_many :power_withs, dependent: :destroy
  has_many :power_with_users, through: :power_withs, source: :user
  validates :place_id, uniqueness: true
end
