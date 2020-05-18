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
