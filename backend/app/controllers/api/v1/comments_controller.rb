module Api
  module V1
    class CommentsController < ApiController
      before_action :authenticate_api_v1_user!, only: %i[create destroy]

      def create
        @comment = current_api_v1_user.comments.create!(comments_params)
        render json: convert_to_json_comment(@comment)
      end

      def destroy
        comment = current_api_v1_user.comments.find(params[:id])
        comment.destroy!
        render json: comment.as_json(only: :id)
      end

      private

        def comments_params
          params.fetch(:comment, {}).permit(:spot_id, :content, :image)
        end

        def convert_to_json_comment(comment)
          data = Comment.joins(:user)
                        .select('users.name AS user_name')
                        .last

          url = rails_blob_url(comment.image) if comment.image.attached?

          {
            data: data,
            image: url
          }
        end
    end
  end
end
