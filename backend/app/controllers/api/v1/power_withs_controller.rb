module Api
  module V1
    class PowerWithsController < ApiController
      before_action :authenticate_api_v1_user!, only: [:create]

      def create
        power_with = current_api_v1_user.power_withs.create!(power_with_params)
        render json: power_with
      end

      private

        def power_with_params
          params.fetch(:power_with, {}).permit(:spot_id)
        end
    end
  end
end
