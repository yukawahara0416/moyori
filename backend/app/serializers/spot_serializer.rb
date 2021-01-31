class SpotSerializer < ActiveModel::Serializer
  attributes :data

  def data
    {
      id: object.id,
      user_id: object.user_id,
      place_id: object.place_id,
      name: object.name,
      address: object.address,
      position: {
        lat: object.lat.to_f,
        lng: object.lng.to_f
      },
      on: false,
      zIndex: 10,
      photo_reference: object.photo_reference,
      picture: picture,
      phone: object.phone,
      url: object.url
    }
  end

  def picture
    if Rails.env.production?
    object.picture.attachment.service.send(:object_for, object.picture.key).public_url if object.picture.attached?
    end
  end

  has_many :likes
  has_many :wifi_withs
  has_many :wifi_withouts
  has_many :power_withs
  has_many :power_withouts
  has_many :comments
end
