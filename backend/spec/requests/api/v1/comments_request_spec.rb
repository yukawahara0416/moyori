require 'rails_helper'

RSpec.describe 'Api::V1::Comments', type: :request do
  let(:spot)         { FactoryBot.create(:spot) }
  let(:current_user) { FactoryBot.create(:user) }
  let(:comment_params) { { comment: { content: 'example content', spot_id: spot.id } } }
  subject(:login) { post(api_v1_user_session_path, params: { email: current_user.email, password: current_user.password }) }

  before do
    login
    @headers = {
      'uid': response.headers['uid'],
      'client': response.headers['client'],
      'access-token': response.headers['access-token']
    }
  end

  it 'commentできる' do
    expect { post(api_v1_comments_path, params: comment_params, headers: @headers) }.to change(Comment, :count).by(1)
    json = JSON.parse(response.body)
    expect(response).to have_http_status(200)
    expect(json['content']).to eq 'example content'
    expect(json['user_name']).to eq(current_user.name)
    expect(json['image']).to eq nil
  end

  it 'commentを削除できる' do
    post(api_v1_comments_path, params: comment_params, headers: @headers)
    create_json = JSON.parse(response.body)
    expect { delete("/api/v1/comments/#{create_json['id']}", headers: @headers) }.to change(Comment, :count).by(-1)
    delete_json = JSON.parse(response.body)
    expect(response).to have_http_status(200)
    expect(delete_json['id']).to eq(create_json['id'])
  end
end
