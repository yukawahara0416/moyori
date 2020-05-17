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
end
