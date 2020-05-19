module Api
  module V1
    class UsersController < ApiController
      def show
        user = User.find(params[:id])
        render json: convert_to_json(user)
      end

      private

        def convert_to_json(user)
          likes = user.likes
          wifi_withs = user.wifi_withs
          wifi_withouts = user.wifi_withouts
          power_withs = user.power_withs
          power_withouts = user.power_withouts
          comments = user.comments
          {
            data: user,
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
