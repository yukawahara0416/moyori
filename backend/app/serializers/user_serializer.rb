class UserSerializer < ActiveModel::Serializer
  attributes :data

  def data
    {
      id: object.id,
      email: object.email,
      name: object.name,
      avatar: avatar
    }
  end

  def avatar
    object.avatar.attachment.service.send(:object_for, object.avatar.key).public_url if object.avatar.attached?
  end

  has_many :spots, key: :posts
  has_many :likes
  has_many :wifi_withs
  has_many :wifi_withouts
  has_many :power_withs
  has_many :power_withouts
end