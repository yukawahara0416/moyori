module Api
  module V1
    class WifiWithsController < ApiController
      before_action :authenticate_api_v1_user!, only: [:create]

      def create
        wifi_with = current_api_v1_user.wifi_with.create!(wifi_with_params)
        render json: wifi_with
      end

      private

        def wifi_with_params
          params.fetch(:wifi_with, {}).permit(:spot_id)
        end
    end
  end
end
