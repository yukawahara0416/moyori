require 'rails_helper'

RSpec.describe Admin::AdminUsersController, type: :controller do
  let(:current_admin_user) { FactoryBot.create(:admin_user) }
  let(:params) { FactoryBot.attributes_for(:admin_user) }
  subject(:signup) { post :create, params: { admin_user: params } }

  before { sign_in current_admin_user }

  it '新規登録できる' do
    expect { signup }.to change(AdminUser, :count).by(1)
  end

  it 'emailがないと新規登録できない' do
    params[:email] = ''
    expect do
      post :create, params: { admin_user: params }
    end.to change(AdminUser, :count).by(0)
  end

  it 'passwordがないと新規登録できない' do
    params[:password] = ''
    expect do
      post :create, params: { admin_user: params }
    end.to change(AdminUser, :count).by(0)
  end

  it 'プロフィールを更新できる' do
    edit_user = FactoryBot.create(:admin_user)
    put :update, params: { id: edit_user.id, admin_user: { email: 'update@example.com', password: edit_user.password } }
    expect(AdminUser.last.email).to eq('update@example.com')
  end

  it 'アカウントを削除できる' do
    delete_user = FactoryBot.create(:admin_user)
    expect do
      delete :destroy, params: { id: delete_user.id }
    end.to change(AdminUser, :count).by(-1)
  end
end
