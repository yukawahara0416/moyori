module Api
  module V1
    class SpotsController < ApiController
      before_action :authenticate_api_v1_user!, only: [:create]

      def create
        spot = current_api_v1_user.spots.new(spot_params)
        spot.save
        render json: convert_to_json(spot)
      end

      private

        def convert_to_json(spot)
          {
            spot: spot
          }
        end

        def spot_params
          params.fetch(:spot, {}).permit(:place_id)
        end
    end
  end
end
