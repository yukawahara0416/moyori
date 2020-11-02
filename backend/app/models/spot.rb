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
  has_many :power_withouts, dependent: :destroy
  has_many :power_without_users, through: :power_withouts, source: :user
  has_many :comments, dependent: :destroy

  has_one_attached :picture

  validates :address, length: { maximum: 200 }
  validates :name, length: { maximum: 40 }
  validates :place_id, presence: true, uniqueness: true
  validates :url, length: { maximum: 100 }

  scope :order_location_by, lambda { |lat, lng|
                              sort_by_near(lat, lng)
                            }

  def self.sort_by_near(lat, lng)
    select("*, (
      6371 * acos(
          cos(radians(#{lat}))
          * cos(radians(lat))
          * cos(radians(lng) - radians(#{lng}))
          + sin(radians(#{lat}))
          * sin(radians(lat))
      )
      ) AS distance")
      .having('distance <= 0.5')
      .order(:distance)
  end
end
