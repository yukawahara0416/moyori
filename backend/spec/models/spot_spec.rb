require 'rails_helper'

RSpec.describe Spot, type: :model do
  let(:user) { FactoryBot.create(:user) }

  it 'spotファクトリが有効' do
    spot = FactoryBot.create(:spot)
    expect(spot).to be_valid
  end

  it 'user_id, place_id, title, lat, lngがあれば有効' do
    lat = '33.583745'
    lng = '130.325260'
    spot = Spot.new(
      user_id: user.id,
      place_id: 'abcdefg12345',
      title: 'example_spot',
      lat: lat.to_f,
      lng: lng.to_f
    )
    expect(spot).to be_valid
  end

  it '重複したplace_idだと無効' do
    spot = FactoryBot.create(:spot)
    spot_dup = FactoryBot.build(:spot, place_id: spot.place_id)
    spot_dup.valid?
    expect(spot_dup.errors.messages[:place_id]).to include 'has already been taken'
  end

  it 'userを削除する際に関連するspotも削除される' do
    spot = FactoryBot.create(:spot)
    expect { spot.user.destroy }.to change(Spot, :count).by(-1)
  end
end
