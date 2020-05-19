require 'rails_helper'

RSpec.describe 'Api::V1::WifiWithouts', type: :request do
  let(:spot) { FactoryBot.create(:spot) }
  let(:current_user) { FactoryBot.create(:user) }
  let(:wifi_without_params) { { wifi_without: { spot_id: spot.id } } }
  subject(:login) { post(api_v1_user_session_path, params: { email: current_user.email, password: current_user.password }) }

  before do
    login
    @headers = {
      'uid': response.headers['uid'],
      'client': response.headers['client'],
      'access-token': response.headers['access-token']
    }
  end

  it 'wifiWithoutできる' do
    expect { post(api_v1_wifi_withouts_path, params: wifi_without_params, headers: @headers) }.to change(WifiWithout, :count).by(1)
    expect(response).to have_http_status(200)
  end
end
