require 'rails_helper'

RSpec.describe 'Api::V1::WifiWiths', type: :request do
  let(:spot) { FactoryBot.create(:spot) }
  let(:current_user) { FactoryBot.create(:user) }
  let(:wifi_with_params) { { wifi_with: { spot_id: spot.id } } }
  subject(:login) { post(api_v1_user_session_path, params: { email: current_user.email, password: current_user.password }) }

  before do
    login
    @headers = {
      'uid': response.headers['uid'],
      'client': response.headers['client'],
      'access-token': response.headers['access-token']
    }
  end

  it 'wifiWithできる' do
    expect { post(api_v1_wifi_withs_path, params: wifi_with_params, headers: @headers) }.to change(WifiWith, :count).by(1)
    expect(response).to have_http_status(200)
  end
end
