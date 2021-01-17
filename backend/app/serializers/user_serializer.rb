class UserSerializer < ActiveModel::Serializer
  attributes :data

  def data
    {
      id: object.id,
      email: object.email,
      name: object.name
    }
  end

end
