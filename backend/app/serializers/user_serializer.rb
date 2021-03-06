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
    if Rails.env.production?
      object.avatar.attachment.service.send(:object_for, object.avatar.key).public_url if object.avatar.attached?
    elsif Rails.env.development?
      object.avatar_url if object.avatar.attached?
    end
  end

  has_many :spots, key: :posts do
    spots = []
    object.spots.where.not('char_length(place_id) > 10').each do |item|
      spots.push(item)
    end
    spots
  end

  has_many :likes do
    spots = []
    object.likes.each do |item|
      spot = Spot.find(item.spot_id)
      spots.push(spot)
    end
    spots
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
  end

  has_many :power_withouts do
    spots = []
    object.power_withouts.each do |item|
      spot = Spot.find(item.spot_id)
      spots.push(spot)
    end
    spots
  end

  has_many :comments do
    spots = []
    object.comments.each do |item|
      spot = Spot.find(item.spot_id)
      spots.push(spot)
    end
    spots
  end
end
