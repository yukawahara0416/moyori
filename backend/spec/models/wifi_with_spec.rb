require 'rails_helper'

RSpec.describe WifiWith, type: :model do
  let(:user) { FactoryBot.create(:user) }
  let(:spot) { FactoryBot.create(:spot) }

  it 'wifi_withファクトリが有効' do
    wifi_with = FactoryBot.create(:wifi_with)
    expect(wifi_with).to be_valid
  end
end
