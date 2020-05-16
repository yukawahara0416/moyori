require 'rails_helper'

RSpec.describe AdminUser, type: :model do
  it 'admin_userファクトリが有効' do
    admin_user = FactoryBot.build(:admin_user)
    expect(admin_user).to be_valid
  end
end
