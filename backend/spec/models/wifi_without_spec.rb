require 'rails_helper'

RSpec.describe WifiWithout, type: :model do
  let(:user) { FactoryBot.create(:user) }
  let(:spot) { FactoryBot.create(:spot) }

  it 'wifi_withoutファクトリが有効' do
    wifi_without = FactoryBot.create(:wifi_without)
    expect(wifi_without).to be_valid
  end
end
