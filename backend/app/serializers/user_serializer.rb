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
    object.avatar.attachment.service.send(:object_for, object.avatar.key).public_url
  end

end
