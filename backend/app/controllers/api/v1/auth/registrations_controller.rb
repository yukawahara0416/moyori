module Api
  module V1
    module Auth
      class RegistrationsController < DeviseTokenAuth::RegistrationsController
        def destroy
          if @resource
            @resource.destroy
            @resource.avatar.prune if @resource.avatar.attached?
            yield @resource if block_given?
            render_destroy_success
          else
            render_destroy_error
          end
        end

        def render_create_success
          render json: convert_to_registrations(@resource)
        end

        def render_update_success
          render json: convert_to_registrations(@resource)
        end

        private

          def sign_up_params
            params.permit(:name, :email, :password, :avatar)
          end

          def account_update_params
            params.permit(:name, :email, :avatar)
          end

          def convert_to_registrations(resource)
            {
              data: {
                id: resource.id,
                email: resource.email,
                provider: resource.provider,
                name: resource.name,
                avatar: set_avatar(resource.id),
                uid: resource.uid,
                allow_password_change: resource.allow_password_change,
                created_at: resource.created_at,
                updated_at: resource.updated_at,
                credentials: resource.credentials
              }
            }
          end

          def set_avatar(id)
            user = User.find(id)
            avatar = rails_blob_url(user.avatar) if user.avatar.attached?

            avatar
          end
      end
    end
  end
end
