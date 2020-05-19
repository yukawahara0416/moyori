module Api
  module V1
    class LikesController < ApiController
      before_action :authenticate_api_v1_user!, only: [:create]

      def create
        like = current_api_v1_user.likes.create!(likes_params)
        render json: like
      end

      private

        def likes_params
          params.fetch(:like, {}).permit(:spot_id)
        end
    end
  end
end
