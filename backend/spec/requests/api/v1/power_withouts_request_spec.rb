require 'rails_helper'

RSpec.describe 'Api::V1::PowerWithouts', type: :request do
  let(:spot)         { FactoryBot.create(:spot) }
  let(:current_user) { FactoryBot.create(:user) }
  let(:power_without_params) { { power_without: { spot_id: spot.id } } }
  subject(:login) { post(api_v1_user_session_path, params: { email: current_user.email, password: current_user.password }) }

  before do
    login
    @headers = {
      'uid': response.headers['uid'],
      'client': response.headers['client'],
      'access-token': response.headers['access-token']
    }
  end

  it 'powerWithoutできる' do
    expect { post(api_v1_power_withouts_path, params: power_without_params, headers: @headers) }.to change(PowerWithout, :count).by(1)
    expect(response).to have_http_status(200)
  end
end
