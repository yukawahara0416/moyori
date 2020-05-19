module Api
  module V1
    class WifiWithoutsController < ApiController
      before_action :authenticate_api_user!, only: [:create]

      def create
        wifi_without = current_api_v1_user.wifi_without.create!(wifi_without_params)
        render json: wifi_without
      end

      private

        def wifi_without_params
          params.fetch(:wifi_without, {}).permit(:spot_id)
        end
    end
  end
end
