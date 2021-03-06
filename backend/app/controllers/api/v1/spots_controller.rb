module Api
  module V1
    class SpotsController < ApiController
      before_action :authenticate_api_v1_user!, only: %i[save create update destroy]

      def collate
        spot = Spot.where(place_id: params[:place_id])
        if spot == []
          head :no_content
        else
          render status: 200, json: spot
        end
      end

      def nearby
        lat = params[:lat]
        lng = params[:lng]
        distance = params[:distance]
        spots = Spot.all
        spots = spots.order_location_by(
          lat, lng, distance
        )
        render status: 200, json: spots, each_serializer: SpotSerializer
      end

      def show
        spot = Spot.find(params[:id])
        render status: 200, json: spot
      end

      def create
        spot = current_api_v1_user.spots.create!(spot_params)
        render status: 200, json: spot
      end

      def update
        spot = current_api_v1_user.spots.find(params[:id])
        spot.update_attributes(spot_params)
        if params.key?(:picture)
          spot.picture.purge if spot.picture.attached?
          spot.picture.attach(params[:picture])
        end
        render status: 200, json: spot
      end

      def destroy
        spot = current_api_v1_user.spots.find(params[:id])
        spot.picture.purge if spot.picture.attached?
        spot.destroy!
        render json: spot.as_json(only: :id)
      end

      private

        def spot_params
          params.fetch(:spot, {}).permit(:place_id, :name, :address, :lat, :lng, :photo_reference, :picture, :phone, :url, :distance)
        end
    end
  end
end
