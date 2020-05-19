require 'rails_helper'

RSpec.describe PowerWith, type: :model do
  let(:user) { FactoryBot.create(:user) }
  let(:spot) { FactoryBot.create(:spot) }

  it 'power_withファクトリが有効' do
    power_with = FactoryBot.create(:power_with)
    expect(power_with).to be_valid
  end

  it 'user_id、spot_idがあれば有効' do
    power_with = PowerWith.new(
      user_id: user.id,
      spot_id: spot.id
    )
    expect(power_with).to be_valid
  end

  it 'user_idがなければ無効' do
    power_with = FactoryBot.build(:power_with, user_id: nil)
    power_with.valid?
    expect(power_with.errors.messages[:user]).to include 'must exist'
  end

  it 'spot_idがなければ無効' do
    power_with = FactoryBot.build(:power_with, spot_id: nil)
    power_with.valid?
    expect(power_with.errors.messages[:spot]).to include 'must exist'
  end
end
