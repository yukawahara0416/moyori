# rubocop:disable all

module Api
  module V1
    class UsersController < ApiController
      include Common

      def show
        user = User.find(params[:id])
        render json: convert_to_json_user(user)
        # render json: user, serializer: UserSerializer
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

          # avatar = rails_blob_url(user.avatar) if user.avatar.attached?
          # avatar = user.avatar_url

          user.spots.where.not('char_length(place_id) > 10').each do |spot|
            json = convert_to_json(spot)
            posts.push(json)
          end

          user.likes.each do |item|
            spot = Spot.find(item.spot_id)
            json = convert_to_json(spot)
            likes.push(json)
          end

          user.wifi_withs.each do |item|
            spot = Spot.find(item.spot_id)
            json = convert_to_json(spot)
            wifi_withs.push(json)
          end

          user.wifi_withouts.each do |item|
            spot = Spot.find(item.spot_id)
            json = convert_to_json(spot)
            wifi_withouts.push(json)
          end

          user.power_withs.each do |item|
            spot = Spot.find(item.spot_id)
            json = convert_to_json(spot)
            power_withs.push(json)
          end

          user.power_withouts.each do |item|
            spot = Spot.find(item.spot_id)
            json = convert_to_json(spot)
            power_withouts.push(json)
          end

          spot_ids = []
          user.comments.each do |item|
            spot_ids.push(item[:spot_id])
          end
          spot_ids.uniq.each do |item|
            spot = Spot.find(item)
            json = convert_to_json(spot)
            comments.push(json)
          end

          {
            data: {
              id: user.id,
              email: user.email,
              name: user.name,
              avatar: avatar
            },
            posts: posts,
            likes: likes,
            wifi_withs: wifi_withs,
            wifi_withouts: wifi_withouts,
            power_withs: power_withs,
            power_withouts: power_withouts,
            comments: comments
          }
        end
    end
  end
end
