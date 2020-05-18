class Spot < ApplicationRecord
  belongs_to :user
  validates :place_id, uniqueness: true
end
