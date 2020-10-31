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

        def convert_to_json_gmap_spot(spot)
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
            # marker: nil,
            likes: likes,
            wifi_withs: wifi_withs,
            wifi_withouts: wifi_withouts,
            power_withs: power_withs,
            power_withouts: power_withouts,
            comments: comments_add_image
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

        def spot_params
          params.fetch(:spot, {}).permit(:address, :picture, :lat, :lng, :name, :place_id, :phone, :url)
        end

        def convert_to_add_image(comment)
          url = rails_blob_url(comment.image) if comment.image.attached?

          {
            comment: comment,
            image: url
          }
        end
    end
  end
end
