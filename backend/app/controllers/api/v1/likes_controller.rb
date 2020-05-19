module Api
  module V1
    class LikesController < ApiController
      before_action :authenticate_api_v1_user!, only: %i[create destroy]

      def create
        like = current_api_v1_user.likes.create!(likes_params)
        render json: like
      end

      def destroy
        like = current_api_v1_user.likes.find(params[:id])
        like.destroy!
        render json: like.as_json(only: :id)
      end

      private

        def likes_params
          params.fetch(:like, {}).permit(:spot_id)
        end
    end
  end
end
