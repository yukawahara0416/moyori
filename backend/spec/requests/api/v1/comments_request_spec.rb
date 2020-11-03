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
    expect(response).to have_http_status(200)
  end

  it 'commentを削除できる' do
    post(api_v1_comments_path, params: comment_params, headers: @headers)
    json = JSON.parse(response.body)
    expect { delete("/api/v1/comments/#{json['comment']['id']}", headers: @headers) }.to change(Comment, :count).by(-1)
    expect(response).to have_http_status(200)
  end
end
