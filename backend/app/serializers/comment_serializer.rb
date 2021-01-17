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
  end
end
