module Api
  module V1
    class UsersController < ApiController
      def show
        user = User.find(params[:id])
        render json: convert_to_json_user(user)
      end

      private

        # rubocop:disable Metrics/AbcSize, Style/MethodLength

        def convert_to_json_user(user)
          posts = []
          likes = []
          wifi_withs = []
          wifi_withouts = []
          power_withs = []
          power_withouts = []
          comments = []

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

          user.comments.each do |item|
            spot = Spot.find(item.spot_id)
            json = convert_to_json_posted_spot(spot)
            comments.push(json)
          end

          {
            data: user,
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
            image: spot.image,
            name: spot.name,
            on: false,
            place_id: spot.place_id,
            position: {
              lat: spot.lat,
              lng: spot.lng
            },
            zIndex: 10
          }
          likes = spot.likes
          wifi_withs = spot.wifi_withs
          wifi_withouts = spot.wifi_withouts
          power_withs = spot.power_withs
          power_withouts = spot.power_withouts
          comments = spot.comments
          {
            data: spot,
            marker: marker,
            likes: likes,
            wifi_withs: wifi_withs,
            wifi_withouts: wifi_withouts,
            power_withs: power_withs,
            power_withouts: power_withouts,
            comments: comments
          }
        end

      # rubocop:enable Metrics/AbcSize, Style/MethodLength
    end
  end
end
