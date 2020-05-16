require 'rails_helper'

RSpec.describe Admin::AdminUsersController, type: :controller do
  let(:current_admin_user) { FactoryBot.create(:admin_user) }

  it 'ログインできる' do
    sign_in current_admin_user
    expect(response).to have_http_status(200)
  end

  it 'emailを間違えるとログインできない' do
    post :create, params: { admin_user: { email: 'wrong@examole.com', password: current_admin_user.password } }
    expect(response).to have_http_status(302)
  end

  it 'passwordを間違えるとログインできない' do
    post :create, params: { admin_user: { email: current_admin_user.email, password: 'wrongpassword' } }
    puts response.header.inspect
    expect(response).to have_http_status(302)
  end

  it 'ログアウトできる' do
    sign_in current_admin_user
    delete :destroy, params: { id: current_admin_user.id }
    expect(response).to have_http_status(302)
  end
end
