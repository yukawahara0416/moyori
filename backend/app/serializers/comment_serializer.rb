class CommentSerializer < ActiveModel::Serializer
  attributes :id,
             :spot_id,
             :user_id,
             :user_name,
             :avatar,
             :content,
             :image,
             :created_at,
             :updated_at

  def user_name
    user = User.find(object.user_id)
    user.name
  end

  def avatar
    user = User.find(object.user_id)
    user.avatar.attachment.service.send(:object_for, user.avatar.key).public_url if user.avatar.attached?
  end

  def image
    object.image.attachment.service.send(:object_for, object.image.key).public_url if object.image.attached?
  end
end
