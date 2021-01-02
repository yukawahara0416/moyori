require 'rails_helper'

RSpec.describe Spot, type: :model do
  let(:user) { FactoryBot.create(:user) }

  it 'spotファクトリが有効' do
    spot = FactoryBot.create(:spot)
    expect(spot).to be_valid
  end

  it 'user_id, place_id' do
    spot = Spot.new(
      user_id: user.id,
      place_id: 'abcdefg12345'
    )
    expect(spot).to be_valid
  end

  it 'user_idがなければ無効' do
    spot = FactoryBot.build(:spot, user_id: nil)
    spot.valid?
    expect(spot.errors.messages[:user]).to include 'must exist'
  end

  it 'place_idがなければ無効' do
    spot = FactoryBot.build(:spot, place_id: nil)
    spot.valid?
    expect(spot.errors.messages[:place_id]).to include "can't be blank"
  end

  it 'addressが201文字以上で無効' do
    spot = FactoryBot.build(:spot, address: 'a' * 201)
    spot.valid?
    expect(spot.errors.messages[:address]).to include 'is too long (maximum is 200 characters)'
  end

  it 'nameが101文字以上で無効' do
    spot = FactoryBot.build(:spot, name: 'a' * 101)
    spot.valid?
    expect(spot.errors.messages[:name]).to include 'is too long (maximum is 100 characters)'
  end

  it 'urlが101文字以上で無効' do
    spot = FactoryBot.build(:spot, url: 'a' * 101)
    spot.valid?
    expect(spot.errors.messages[:url]).to include 'is too long (maximum is 100 characters)'
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
