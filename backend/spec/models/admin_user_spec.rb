require 'rails_helper'

RSpec.describe AdminUser, type: :model do
  it 'admin_userファクトリが有効' do
    admin_user = FactoryBot.build(:admin_user)
    expect(admin_user).to be_valid
  end

  it 'email,passwordがあれば有効' do
    admin_user = AdminUser.new(
      email: 'example@example.com',
      password: 'examplepassword'
    )
    expect(admin_user).to be_valid
  end

  it 'emailがなければ無効' do
    admin_user = FactoryBot.build(:admin_user, email: nil)
    admin_user.valid?
    expect(admin_user.errors.messages[:email]).to include "can't be blank"
  end

  it 'passwordがなければ無効' do
    admin_user = FactoryBot.build(:admin_user, password: nil)
    admin_user.valid?
    expect(admin_user.errors.messages[:password]).to include "can't be blank"
  end

  it 'passwordが5文字以下だと無効' do
    admin_user = FactoryBot.build(:admin_user, password: 'a' * 5)
    admin_user.valid?
    expect(admin_user.errors.messages[:password]).to include 'is too short (minimum is 6 characters)'
  end

  it 'passwordが129文字以上だと無効' do
    admin_user = FactoryBot.build(:admin_user, password: 'a' * 129)
    admin_user.valid?
    expect(admin_user.errors.messages[:password]).to include 'is too long (maximum is 128 characters)'
  end
end
