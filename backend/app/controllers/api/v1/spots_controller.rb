module Api
  module V1
    class SpotsController < ApplicationController
      before_action :authenticate_api_user!, except: [:create]
      protect_from_forgery except: [:create]

      def create
        spot = current_api_user.spots.new(spot_params)
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
