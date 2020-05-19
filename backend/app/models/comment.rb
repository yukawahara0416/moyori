class Comment < ApplicationRecord
  belongs_to :user
  belongs_to :spot
  validates :content, presence: true, length: { maximum: 1000 }
end
