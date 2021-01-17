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
      image: object.image,
      picture: picture,
      phone: object.phone,
      url: object.url
    }
  end
end
