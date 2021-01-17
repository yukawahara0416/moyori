class SpotSerializer < ActiveModel::Serializer
  attributes :data

  def data
    {
      id: object.id,
      user_id: object.user_id
    }
  end
end
