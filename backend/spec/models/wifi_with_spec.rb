require 'rails_helper'

RSpec.describe WifiWith, type: :model do
  let(:user) { FactoryBot.create(:user) }
  let(:spot) { FactoryBot.create(:spot) }

  it 'wifi_withファクトリが有効' do
    wifi_with = FactoryBot.create(:wifi_with)
    expect(wifi_with).to be_valid
  end

  it 'user_id、spot_idがあれば有効' do
    wifi_with = WifiWith.new(
      user_id: user.id,
      spot_id: spot.id
    )
    expect(wifi_with).to be_valid
  end

  it 'user_idがなければ無効' do
    wifi_with = FactoryBot.build(:wifi_with, user_id: nil)
    wifi_with.valid?
    expect(wifi_with.errors.messages[:user]).to include 'must exist'
  end

  it 'spot_idがなければ無効' do
    wifi_with = FactoryBot.build(:wifi_with, spot_id: nil)
    wifi_with.valid?
    expect(wifi_with.errors.messages[:spot]).to include 'must exist'
  end

  it 'userを削除する際に関連するwifi_withも削除される' do
    wifi_with = FactoryBot.create(:wifi_with)
    expect { wifi_with.user.destroy }.to change(WifiWith, :count).by(-1)
  end

  it 'spotを削除する際に関連するwifi_withも削除される' do
    wifi_with = FactoryBot.create(:wifi_with)
    expect { wifi_with.spot.destroy }.to change(WifiWith, :count).by(-1)
  end
end
