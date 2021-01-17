class CommentSerializer < ActiveModel::Serializer
  attributes :id,
             :spot_id,
             :user_id,
             :user_name,
             :avatar,
             :content,
             :image
end
