module Api
  module V1
    class CommentsController < ApiController
      before_action :authenticate_api_v1_user!, only: %i[create destroy]

      def create
        current_api_v1_user.comments.create!(comments_params)
        render json: convert_to_json_comment
      end

      def destroy
        comment = current_api_v1_user.comments.find(params[:id])
        comment.destroy!
        render json: comment.as_json(only: :id)
      end

      private

        def comments_params
          params.fetch(:comment, {}).permit(:spot_id, :content)
        end

        def convert_to_json_comment
          Comment.joins(:user)
                 .select('
                    comments.id,
                    comments.content,
                    spot_id,
                    user_id,
                    comments.created_at,
                    comments.updated_at,
                    users.name AS user_name')
                 .last
        end
    end
  end
end
