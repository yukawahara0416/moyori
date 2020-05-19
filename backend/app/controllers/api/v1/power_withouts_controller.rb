module Api
  module V1
    class PowerWithoutsController < ApiController
      before_action :authenticate_api_v1_user!, only: %i[create destroy]

      def create
        power_without = current_api_v1_user.power_withouts.create!(power_without_params)
        render json: power_without
      end

      def destroy
        power_without = current_api_v1_user.power_withouts.find(params[:id])
        power_without.destroy!
        render json: power_without.as_json(only: :id)
      end

      private

        def power_without_params
          params.fetch(:power_without, {}).permit(:spot_id)
        end
    end
  end
end
