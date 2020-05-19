require 'rails_helper'

RSpec.describe 'Api::V1::Likes', type: :request do
  let(:spot)         { FactoryBot.create(:spot) }
  let(:current_user) { FactoryBot.create(:user) }
  let(:like_params)  { { like: { spot_id: spot.id } } }
  subject(:login)    { post(api_v1_user_session_path, params: { email: current_user.email, password: current_user.password }) }

  before do
    login
    @headers = {
      'uid': response.headers['uid'],
      'client': response.headers['client'],
      'access-token': response.headers['access-token']
    }
  end

  it 'likeできる' do
    expect { post(api_v1_likes_path, params: like_params, headers: @headers) }.to change(Like, :count).by(1)
    expect(response).to have_http_status(200)
  end

  it 'unlikeできる' do
    post(api_v1_likes_path, params: like_params, headers: @headers)
    json = JSON.parse(response.body)
    expect { delete("/api/v1/likes/#{json['id']}", headers: @headers) }.to change(Like, :count).by(-1)
    expect(response).to have_http_status(200)
  end
end
