class ApiController < ActionController::API
  include DeviseTokenAuth::Concerns::SetUserByToken
  protect_from_forgery
  before_action :skip_session

  protected

    def skip_session
      request.session_options[:skip] = true
    end
end

# 今後コントローラーを作成する際は
# ApplicationControllerではなく
# ApiContollerを継承する必要があります。

# class ExampleController < ApiController
# end
