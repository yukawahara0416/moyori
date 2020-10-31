module Api
  module V1
    class UsersController < ApiController
      def show
        user = User.find(params[:id])
        render json: convert_to_json_user(user)
      end

      private

        def convert_to_json_user(user)
          posts = []
          likes = []
          wifi_withs = []
          wifi_withouts = []
          power_withs = []
          power_withouts = []
          comments = []

          avatar = rails_blob_url(user.avatar) if user.avatar.attached?

          user.spots.where.not(lat: nil).each do |spot|
            json = convert_to_json_posted_spot(spot)
            posts.push(json)
          end

          user.likes.each do |item|
            spot = Spot.find(item.spot_id)
            json = convert_to_json_posted_spot(spot)
            likes.push(json)
          end

          user.wifi_withs.each do |item|
            spot = Spot.find(item.spot_id)
            json = convert_to_json_posted_spot(spot)
            wifi_withs.push(json)
          end

          user.wifi_withouts.each do |item|
            spot = Spot.find(item.spot_id)
            json = convert_to_json_posted_spot(spot)
            wifi_withouts.push(json)
          end

          user.power_withs.each do |item|
            spot = Spot.find(item.spot_id)
            json = convert_to_json_posted_spot(spot)
            power_withs.push(json)
          end

          user.power_withouts.each do |item|
            spot = Spot.find(item.spot_id)
            json = convert_to_json_posted_spot(spot)
            power_withouts.push(json)
          end

          spot_ids = []
          user.comments.each do |item|
            spot_ids.push(item[:spot_id])
          end
          spot_ids.uniq.each do |item|
            spot = Spot.find(item)
            json = convert_to_json_posted_spot(spot)
            comments.push(json)
          end

          {
            data: user,
            avatar: avatar,
            posts: posts,
            likes: likes,
            wifi_withs: wifi_withs,
            wifi_withouts: wifi_withouts,
            power_withs: power_withs,
            power_withouts: power_withouts,
            comments: comments
          }
        end

        def convert_to_json_posted_spot(spot)
          marker = {
            address: spot.address,
            # image: spot.image,
            name: spot.name,
            on: false,
            phone: spot.phone,
            place_id: spot.place_id,
            position: {
              lat: spot.lat,
              lng: spot.lng
            },
            zIndex: 10
          }
          url = rails_blob_url(spot.picture) if spot.picture.attached?
          likes = spot.likes
          wifi_withs = spot.wifi_withs
          wifi_withouts = spot.wifi_withouts
          power_withs = spot.power_withs
          power_withouts = spot.power_withouts
          comments = Comment.joins(:user)
                            .where(spot_id: spot.id)
                            .select('
                              comments.id,
                              comments.content,
                              spot_id,
                              user_id,
                              comments.created_at,
                              comments.updated_at,
                              users.name AS user_name')

          comments_add_image = []
          comments.each do |comment|
            comment_add_image = convert_to_add_image(comment)
            comments_add_image.push(comment_add_image)
          end

          {
            data: spot,
            detail: {},
            picture: url,
            marker: marker,
            likes: likes,
            wifi_withs: wifi_withs,
            wifi_withouts: wifi_withouts,
            power_withs: power_withs,
            power_withouts: power_withouts,
            comments: comments_add_image
          }
        end

        def convert_to_add_image(comment)
          url = rails_blob_url(comment.image) if comment.image.attached?

          {
            comment: comment,
            image: url
          }
        end

      # rubocop:enable
    end
  end
end
