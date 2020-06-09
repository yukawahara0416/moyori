module Api
  module V1
    class SpotsController < ApiController
      before_action :authenticate_api_v1_user!, only: [:create]

      def index
        spot = Spot.where(place_id: params[:place_id])
        if spot == []
          head :no_content
        else
          render json: convert_to_json(spot[0])
        end
      end

      def show
        spot = Spot.find(params[:id])
        render json: convert_to_json(spot)
      end

      def create
        spot = current_api_v1_user.spots.new(spot_params)
        spot.save
        render json: convert_to_json(spot)
      end

      private

        def convert_to_json(spot)
          likes = spot.likes
          wifi_withs = spot.wifi_withs
          wifi_withouts = spot.wifi_withouts
          power_withs = spot.power_withs
          power_withouts = spot.power_withouts
          comments = spot.comments
          {
            record: spot,
            likes: likes,
            wifi_withs: wifi_withs,
            wifi_withouts: wifi_withouts,
            power_withs: power_withs,
            power_withouts: power_withouts,
            comments: comments
          }
        end

        def spot_params
          params.fetch(:spot, {}).permit(:place_id)
        end
    end
  end
end
