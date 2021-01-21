# rubocop:disable all

module Api
  module V1
    class UsersController < ApiController
      def show
        user = User.find(params[:id])
        render status: 200, json: user
      end
    end
  end
end
