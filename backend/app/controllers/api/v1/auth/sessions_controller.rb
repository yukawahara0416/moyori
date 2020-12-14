module Api
  module V1
    module Auth
      class SessionsController < DeviseTokenAuth::SessionsController
        def render_create_success
          render json: convert_to_sessions(@resource)
        end

        private

          def convert_to_sessions(resource)
            {
              data: {
                id: resource.id,
                email: resource.email,
                provider: resource.provider,
                name: resource.name,
                avatar: nil,
                uid: resource.uid,
                allow_password_change: resource.allow_password_change,
                created_at: resource.created_at,
                updated_at: resource.updated_at,
                credentials: resource.credentials
              }
            }
          end
      end
    end
  end
end
