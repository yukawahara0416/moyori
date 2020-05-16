class ApiController < ActionController::API
  include DeviseTokenAuth::Concerns::SetUserByToken
end

# 今後コントローラーを作成する際は
# ApplicationControllerではなく
# ApiContollerを継承する必要があります。

# class ExampleController < ApiController
# end
