module Api
  module V1
    class UsersController < ApiController
      def show
        user = User.find(params[:id])
        render json: convert_to_json(user)
      end

      private

        def convert_to_json(user)
          {
            user: user
          }
        end
    end
  end
end
