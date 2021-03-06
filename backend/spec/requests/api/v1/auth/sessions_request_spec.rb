require 'rails_helper'

RSpec.describe 'Api::V1::Auth::SessionsController', type: :request do
  let(:current_user) { FactoryBot.create(:user) }
  subject(:login)    { post(api_v1_user_session_path, params: { email: current_user.email, password: current_user.password }) }

  describe 'POST /api/v1/auth/sign_in' do
    it 'ログインできる' do
      login
      expect(response).to have_http_status(200)
      expect(response.headers['uid']).to be_present
      expect(response.headers['client']).to be_present
      expect(response.headers['access-token']).to be_present
    end

    it 'emailを間違えるとログインできない' do
      post(api_v1_user_session_path,
           params: {
             email: 'wrong@example.com',
             password: current_user.password
           })
      expect(response).to have_http_status(401)
      expect(response.headers['uid']).to be_blank
      expect(response.headers['client']).to be_blank
      expect(response.headers['access-token']).to be_blank
    end

    it 'passwordを間違えるとログインできない' do
      post(api_v1_user_session_path,
           params: {
             email: current_user.email,
             password: 'wrongpassword'
           })
      expect(response).to have_http_status(401)
      expect(response.headers['uid']).to be_blank
      expect(response.headers['client']).to be_blank
      expect(response.headers['access-token']).to be_blank
    end
  end

  describe 'DELETE /api/v1/auth/sign_out' do
    it 'ログアウトできる' do
      login
      delete(destroy_api_v1_user_session_path,
             headers: {
               uid: response.headers['uid'],
               client: response.headers['client'],
               "access-token": response.headers['access-token']
             })
      expect(response).to have_http_status(200)
      expect(response.body['success']).to be_truthy
    end
  end
end
