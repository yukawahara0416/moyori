module Common
  extend ActiveSupport::Concern

  def convert_to_json(spot)
    image = spot.picture.attached? ? rails_blob_url(spot.picture) : spot.image
    {
      data: {
        id: spot.id,
        user_id: spot.user_id,
        place_id: spot.place_id,
        name: spot.name,
        address: spot.address,
        position: {
          lat: spot.lat.to_f,
          lng: spot.lng.to_f
        },
        on: false,
        zIndex: 10,
        image: image,
        # photos: nil,
        phone: spot.phone,
        url: spot.url
        # opening_hours: nil
      },
      likes: spot.likes,
      wifi_withs: spot.wifi_withs,
      wifi_withouts: spot.wifi_withouts,
      power_withs: spot.power_withs,
      power_withouts: spot.power_withouts,
      comments: comments_joins_users(spot)
    }
  end

  def comments_joins_users(spot)
    comments_with_image = []
    comments = Comment.joins(:user)
                      .where(spot_id: spot.id)
                      .select('
                              comments.id,
                              spot_id,
                              user_id,
                              users.name AS user_name,
                              comments.content,
                              comments.created_at,
                              comments.updated_at
                            ')
    comments.each do |comment|
      result = comment_take_in_image(comment)
      comments_with_image.push(result)
    end

    comments_with_image
  end

  def comment_take_in_image(comment)
    user = User.find(comment.user_id)
    avatar = rails_blob_url(user.avatar) if user.avatar.attached?
    image = rails_blob_url(comment.image) if comment.image.attached?
    {
      id: comment.id,
      spot_id: comment.spot_id,
      user_id: comment.user_id,
      user_name: comment.user_name,
      avatar: avatar,
      content: comment.content,
      image: image,
      created_at: comment.created_at,
      updated_at: comment.updated_at
    }
  end
end
