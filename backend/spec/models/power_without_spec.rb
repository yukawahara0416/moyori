require 'rails_helper'

RSpec.describe PowerWithout, type: :model do
  let(:user) { FactoryBot.create(:user) }
  let(:spot) { FactoryBot.create(:spot) }

  it 'power_withoutファクトリが有効' do
    power_without = FactoryBot.create(:power_without)
    expect(power_without).to be_valid
  end
end
