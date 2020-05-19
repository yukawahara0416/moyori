require 'rails_helper'

RSpec.describe WifiWithout, type: :model do
  let(:user) { FactoryBot.create(:user) }
  let(:spot) { FactoryBot.create(:spot) }

  it 'wifi_withoutファクトリが有効' do
    wifi_without = FactoryBot.create(:wifi_without)
    expect(wifi_without).to be_valid
  end

  it 'user_id、spot_idがあれば有効' do
    wifi_without = WifiWithout.new(
      user_id: user.id,
      spot_id: spot.id
    )
    expect(wifi_without).to be_valid
  end

  it 'user_idがなければ無効' do
    wifi_without = FactoryBot.build(:wifi_without, user_id: nil)
    wifi_without.valid?
    expect(wifi_without.errors.messages[:user]).to include 'must exist'
  end

  it 'spot_idがなければ無効' do
    wifi_without = FactoryBot.build(:wifi_without, spot_id: nil)
    wifi_without.valid?
    expect(wifi_without.errors.messages[:spot]).to include 'must exist'
  end

  it 'userを削除する際に関連するwifi_withoutも削除される' do
    wifi_without = FactoryBot.create(:wifi_without)
    expect { wifi_without.user.destroy }.to change(WifiWithout, :count).by(-1)
  end

  it 'spotを削除する際に関連するwifi_withoutも削除される' do
    wifi_without = FactoryBot.create(:wifi_without)
    expect { wifi_without.spot.destroy }.to change(WifiWithout, :count).by(-1)
  end
end
