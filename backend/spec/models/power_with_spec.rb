require 'rails_helper'

RSpec.describe PowerWith, type: :model do
  let(:user) { FactoryBot.create(:user) }
  let(:spot) { FactoryBot.create(:spot) }

  it 'power_withファクトリが有効' do
    power_with = FactoryBot.create(:power_with)
    expect(power_with).to be_valid
  end
end
