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

  has_many :likes do
    spots = []
    object.likes.each do |item|
      spot = Spot.find(item.spot_id)
      spots.push(spot)
    end

  has_many :wifi_withs do
    spots = []
    object.wifi_withs.each do |item|
      spot = Spot.find(item.spot_id)
      spots.push(spot)
    end
    spots
  end

  has_many :wifi_withouts do
    spots = []
    object.wifi_withouts.each do |item|
      spot = Spot.find(item.spot_id)
      spots.push(spot)
    end
    spots
  end

  has_many :power_withs do
    spots = []
    object.power_withs.each do |item|
      spot = Spot.find(item.spot_id)
      spots.push(spot)
    end
    spots

  has_many :power_withouts do
    spots = []
  end

  end
    spots
  end
end
