require 'rails_helper'

RSpec.describe User, type: :model do
  it 'userファクトリが有効' do
    user = FactoryBot.build(:user)
    expect(user).to be_valid
  end

  it 'name,email,passwordがあれば有効' do
    user = User.new(
      name: 'example name',
      email: 'example@example.com',
      password: 'examplepassword'
    )
    expect(user).to be_valid
  end

  it 'emailがなければ無効' do
    user = FactoryBot.build(:user, email: nil)
    user.valid?
    expect(user.errors.messages[:email]).to include "can't be blank"
  end

  it 'passwordがなければ無効' do
    user = FactoryBot.build(:user, password: nil)
    user.valid?
    expect(user.errors.messages[:password]).to include "can't be blank"
  end

  it 'passwordが5文字以下だと無効' do
    user = FactoryBot.build(:user, password: 'a' * 5)
    user.valid?
    expect(user.errors.messages[:password]).to include 'is too short (minimum is 6 characters)'
  end

  it 'passwordが129文字以上だと無効' do
    user = FactoryBot.build(:user, password: 'a' * 129)
    user.valid?
    expect(user.errors.messages[:password]).to include 'is too long (maximum is 128 characters)'
  end

  it '重複したemailだと無効' do
    user = FactoryBot.create(:user)
    user_dup = FactoryBot.build(:user, email: user.email)
    user_dup.valid?
    expect(user_dup.errors.messages[:email]).to include 'has already been taken'
  end
end
