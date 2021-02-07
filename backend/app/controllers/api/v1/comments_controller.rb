module Api
  module V1
    class CommentsController < ApiController
      before_action :authenticate_api_v1_user!, only: %i[create destroy]

      def create
        comment = current_api_v1_user.comments.create!(comments_params)
        render status: 200, json: comment
      end

      def destroy
        comment = current_api_v1_user.comments.find(params[:id])
        comment.image.purge if comment.image.attached?
        comment.destroy!
        render json: comment.as_json(only: %i[id spot_id])
      end

      private

        def comments_params
          params.fetch(:comment, {}).permit(:spot_id, :content, :image)
        end
    end
  end
end
