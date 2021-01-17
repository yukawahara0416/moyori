class SpotSerializer < ActiveModel::Serializer
  attributes :data

  def data
    {
      id: object.id,
      user_id: object.user_id,
      place_id: object.place_id
    }
  end
end
