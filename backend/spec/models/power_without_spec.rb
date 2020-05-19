require 'rails_helper'

RSpec.describe PowerWithout, type: :model do
  let(:user) { FactoryBot.create(:user) }
  let(:spot) { FactoryBot.create(:spot) }

  it 'power_withoutファクトリが有効' do
    power_without = FactoryBot.create(:power_without)
    expect(power_without).to be_valid
  end

  it 'user_id、spot_idがあれば有効' do
    power_without = PowerWithout.new(
      user_id: user.id,
      spot_id: spot.id
    )
    expect(power_without).to be_valid
  end

  it 'user_idがなければ無効' do
    power_without = FactoryBot.build(:power_without, user_id: nil)
    power_without.valid?
    expect(power_without.errors.messages[:user]).to include 'must exist'
  end

  it 'spot_idがなければ無効' do
    power_without = FactoryBot.build(:power_without, spot_id: nil)
    power_without.valid?
    expect(power_without.errors.messages[:spot]).to include 'must exist'
  end

  it '同一userで同一spotへのPower_withoutは無効' do
    power_without = FactoryBot.create(:power_without)
    power_without_dup = FactoryBot.build(:power_without, user_id: power_without.user.id, spot_id: power_without.spot.id)
    power_without_dup.valid?
    expect(power_without_dup.errors.messages[:spot_id]).to include 'has already been taken'
  end

  it 'userを削除する際に関連するPower_withoutも削除される' do
    power_without = FactoryBot.create(:power_without)
    expect { power_without.user.destroy }.to change(PowerWithout, :count).by(-1)
  end

  it 'spotを削除する際に関連するPower_withoutも削除される' do
    power_without = FactoryBot.create(:power_without)
    expect { power_without.spot.destroy }.to change(PowerWithout, :count).by(-1)
  end
end
