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
  end
end
