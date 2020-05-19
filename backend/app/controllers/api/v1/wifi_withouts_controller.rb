module Api
  module V1
    class WifiWithoutsController < ApiController
      before_action :authenticate_api_v1_user!, only: %i[create destroy]

      def create
        wifi_without = current_api_v1_user.wifi_withouts.create!(wifi_without_params)
        render json: wifi_without
      end

      def destroy
        wifi_without = current_api_v1_user.wifi_withouts.find(params[:id])
        wifi_without.destroy!
        render json: wifi_without.as_json(only: :id)
      end

      private

        def wifi_without_params
          params.fetch(:wifi_without, {}).permit(:spot_id)
        end
    end
  end
end
