module Api
  module V1
    class WifiWithsController < ApiController
      before_action :authenticate_api_v1_user!, only: %i[create destroy]

      def create
        wifi_with = current_api_v1_user.wifi_withs.create!(wifi_with_params)
        render json: wifi_with
      end

      def destroy
        wifi_with = current_api_v1_user.wifi_withs.find(params[:id])
        wifi_with.destroy!
        render json: wifi_with.as_json(only: %i[id spot_id])
      end

      private

        def wifi_with_params
          params.fetch(:wifi_with, {}).permit(:spot_id)
        end
    end
  end
end
