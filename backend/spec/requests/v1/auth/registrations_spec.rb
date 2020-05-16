require 'rails_helper'

RSpec.describe 'Api::V1::Auth::RegistrationsController', type: :request do
  let(:current_user) { FactoryBot.create(:user) }
  let(:params)       { FactoryBot.attributes_for(:user) }
  subject(:signup)   { post(api_v1_user_registration_path, params: params) }
  subject(:login)    { post(api_v1_user_session_path, params: { email: current_user.email, password: current_user.password }) }

  describe 'POST /api/auth' do
    it '新規登録できる' do
      expect { signup }.to change(User, :count).by(1)
      json = JSON.parse(response.body)
      expect(response).to have_http_status(200)
      expect(json['data']['id']).to eq(User.last.id)
      expect(json['data']['email']).to eq(User.last.email)
    end

    it 'nameがないと新規登録できない' do
      params[:name] = ''
      expect { signup }.to change(User, :count).by(0)
      expect(response).to have_http_status(422)
    end

    it 'emailがないと新規登録できない' do
      params[:email] = ''
      expect { signup }.to change(User, :count).by(0)
      expect(response).to have_http_status(422)
    end

    it 'passwordがないと新規登録できない' do
      params[:password] = ''
      expect { signup }.to change(User, :count).by(0)
      expect(response).to have_http_status(422)
    end
  end
end
