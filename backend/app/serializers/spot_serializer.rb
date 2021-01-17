class SpotSerializer < ActiveModel::Serializer
  attributes :data

  def data
    {
      id: object.id
    }
  end
end
