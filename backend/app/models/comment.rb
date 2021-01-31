class Comment < ApplicationRecord
  include Rails.application.routes.url_helpers

  has_one_attached :image
  belongs_to :user
  belongs_to :spot
  validates :content, presence: true, length: { maximum: 1000 }
end
