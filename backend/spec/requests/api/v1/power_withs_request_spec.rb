require 'rails_helper'

RSpec.describe 'Api::V1::PowerWiths', type: :request do
  let(:spot)         { FactoryBot.create(:spot) }
  let(:current_user) { FactoryBot.create(:user) }
  let(:power_with_params) { { power_with: { spot_id: spot.id } } }
  subject(:login) { post(api_v1_user_session_path, params: { email: current_user.email, password: current_user.password }) }

  before do
    login
    @headers = {
      'uid': response.headers['uid'],
      'client': response.headers['client'],
      'access-token': response.headers['access-token']
    }
  end

  it 'powerWithできる' do
    expect { post(api_v1_power_withs_path, params: power_with_params, headers: @headers) }.to change(PowerWith, :count).by(1)
    expect(response).to have_http_status(200)
  end
end
