module Api
  module V1
    module Auth
      class RegistrationsController < DeviseTokenAuth::RegistrationsController
        skip_before_action :verify_authenticity_token

        def destroy
          if @resource
            @resource.avatar.purge if @resource.avatar.attached?
            @resource.destroy!
            yield @resource if block_given?
            render_destroy_success
          else
            render_destroy_error
          end
        end

        def render_create_success
          render json: @resource, serializer: UserSerializer
        end

        def render_update_success
          render json: @resource, serializer: UserSerializer
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
