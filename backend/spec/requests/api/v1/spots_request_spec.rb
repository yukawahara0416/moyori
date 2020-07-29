require 'rails_helper'

RSpec.describe 'Api::V1::Spots', type: :request do
  let(:spot)         { FactoryBot.create(:spot) }
  let(:current_user) { FactoryBot.create(:user) }
  let(:spot_params)  { { spot: { place_id: spot.place_id } } }
  subject(:login)    { post(api_v1_user_session_path, params: { email: current_user.email, password: current_user.password }) }

  it 'place_idが一致するspotを取得する' do
    get(collate_api_v1_spots_path, params: { place_id: spot.place_id })
    json = JSON.parse(response.body)
    expect(response).to have_http_status(200)
    expect(json.length).to eq(7)
  end

  it 'place_idが一致するspotがなければ204を返す' do
    get(collate_api_v1_spots_path, params: { place_id: 'notexistplaceid12345' })
    expect(response).to have_http_status(204)
  end

  it '特定のspotを取得する' do
    get("/api/v1/spots/#{spot.id}")
    json = JSON.parse(response.body)
    expect(response).to have_http_status(200)
    expect(json['record']['place_id']).to eq(spot.place_id)
  end

  it '新規のspotを保存する' do
    login
    headers = {
      'uid': response.headers['uid'],
      'client': response.headers['client'],
      'access-token': response.headers['access-token']
    }
    mock = FactoryBot.build(:spot)
    params = { spot: { place_id: mock.place_id } }
    expect { post(api_v1_spots_path, params: params, headers: headers) }.to change(Spot, :count).by(1)
    expect(response).to have_http_status(200)
  end

  it '特定のspotを削除する' do
    login
    headers = {
      'uid': response.headers['uid'],
      'client': response.headers['client'],
      'access-token': response.headers['access-token']
    }
    mock = FactoryBot.build(:spot)
    params = { spot: { place_id: mock.place_id } }
    post(api_v1_spots_path, params: params, headers: headers)
    json = JSON.parse(response.body)
    expect { delete("/api/v1/spots/#{json['record']['id']}", headers: headers) }.to change(Spot, :count).by(-1)
    expect(response).to have_http_status(200)
  end
end
