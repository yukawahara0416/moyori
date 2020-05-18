require 'rails_helper'

RSpec.describe 'Api::V1::Users', type: :request do
  let(:user) { FactoryBot.create(:user) }

  it '特定のuserを取得する' do
    get("/api/v1/users/#{user.id}")
    json = JSON.parse(response.body)
    expect(response).to have_http_status(200)
    expect(json['user']['id']).to eq(user.id)
  end
end
