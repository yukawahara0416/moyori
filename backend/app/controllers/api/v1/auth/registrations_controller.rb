module Api
  module V1
    module Auth
      class RegistrationsController < DeviseTokenAuth::RegistrationsController
        def render_create_success
          render json: @resource
        end

        private

          def sign_up_params
            params.permit(:name, :email, :password, :avatar)
          end

          def account_update_params
            params.permit(:name, :email, :avatar)
          end
      end
    end
  end
end
