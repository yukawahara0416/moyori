require 'rails_helper'

RSpec.describe User, type: :model do
  it 'userファクトリが有効' do
    user = FactoryBot.build(:user)
    expect(user).to be_valid
  end
end
