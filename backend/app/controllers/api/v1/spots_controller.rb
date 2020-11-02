module Api
  module V1
    class SpotsController < ApiController
      before_action :authenticate_api_v1_user!, only: %i[save create update destroy]

      def collate
        spot = Spot.where(place_id: params[:place_id])
        if spot == []
          head :no_content
        else
          render json: convert_to_json_gmap_spot(spot[0])
        end
      end

      def nearby
        lat = params[:lat]
        lng = params[:lng]
        spots = Spot.all
        spots = spots.order_location_by(
          lat, lng
        )
        nears = []
        spots.each do |spot|
          near = convert_to_json_posted_spot(spot)
          nears.push(near)
        end
        render json: nears
      end

      def save
        spot = current_api_v1_user.spots.new(spot_params)
        spot.save
        render json: convert_to_json_gmap_spot(spot)
      end

      def show
        spot = Spot.find(params[:id])
        render json: convert_to_json_posted_spot(spot)
      end

      def create
        spot = current_api_v1_user.spots.create!(spot_params)
        render json: convert_to_json_posted_spot(spot)
      end

      def update
        spot = current_api_v1_user.spots.find(params[:id])
        spot.update_attributes(spot_params)
        if params.key?(:picture)
          spot.picture.purge
          spot.picture.attach(params[:picture])
        end
        render json: convert_to_json_posted_spot(spot)
      end

      def destroy
        spot = current_api_v1_user.spots.find(params[:id])
        spot.destroy!
        render json: spot.as_json(only: :id)
      end

      private

        def spot_params
          params.fetch(:spot, {}).permit(:address, :picture, :lat, :lng, :name, :place_id, :phone, :url)
        end

        def convert_to_json_gmap_spot(spot)
          {
            data: spot,
            detail: {},
            picture: nil,
            # marker: {},
            likes: spot.likes,
            wifi_withs: spot.wifi_withs,
            wifi_withouts: spot.wifi_withouts,
            power_withs: spot.power_withs,
            power_withouts: spot.power_withouts,
            comments: convert_to_comment(spot)
          }
        end

        def convert_to_json_posted_spot(spot)
          url = rails_blob_url(spot.picture) if spot.picture.attached?
          {
            data: spot,
            detail: {},
            picture: url,
            marker: {
              address: spot.address,
              name: spot.name,
              on: false,
              phone: spot.phone,
              place_id: spot.place_id,
              position: {
                lat: spot.lat.to_f,
                lng: spot.lng.to_f
              },
              zIndex: 10
            },
            likes: spot.likes,
            wifi_withs: spot.wifi_withs,
            wifi_withouts: spot.wifi_withouts,
            power_withs: spot.power_withs,
            power_withouts: spot.power_withouts,
            comments: convert_to_comment(spot)
          }
        end

        def convert_to_comment(spot)
          comments_with_image = []
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
          comments.each do |item|
            comment_with_image = give_image_to_comment(item)
            comments_with_image.push(comment_with_image)
          end

          comments_with_image
        end

        def give_image_to_comment(comment)
          url = rails_blob_url(comment.image) if comment.image.attached?
          { comment: comment, image: url }
        end
    end
  end
end
