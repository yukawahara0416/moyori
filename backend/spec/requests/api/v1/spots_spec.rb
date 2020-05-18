require 'rails_helper'

RSpec.describe 'Api::V1::Spots', type: :request do
  let(:spot)         { FactoryBot.create(:spot) }
  let(:current_user) { FactoryBot.create(:user) }
  let(:spot_params)  { { spot: { place_id: spot.place_id } } }
  subject(:login)    { post(api_v1_user_session_path, params: { email: current_user.email, password: current_user.password }) }

  it '新規のspotを保存する' do
    login
    headers = {
      'uid': response.headers['uid'],
      'client': response.headers['client'],
      'access-token': response.headers['access-token']
    }
    expect { post(api_v1_spots_path, params: spot_params, headers: headers) }.to change(Spot, :count).by(1)
    expect(response).to have_http_status(200)
  end
end
