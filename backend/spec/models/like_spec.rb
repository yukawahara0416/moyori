require 'rails_helper'

RSpec.describe Like, type: :model do
  let(:user) { FactoryBot.create(:user) }
  let(:spot) { FactoryBot.create(:spot) }

  it 'likeファクトリが有効' do
    like = FactoryBot.create(:like)
    expect(like).to be_valid
  end

  it 'user_id、spot_idがあれば有効' do
    like = Like.new(
      user_id: user.id,
      spot_id: spot.id
    )
    expect(like).to be_valid
  end

  it 'user_idがなければ無効' do
    like = FactoryBot.build(:like, user_id: nil)
    like.valid?
    expect(like.errors.messages[:user]).to include 'must exist'
  end

  it 'spot_idがなければ無効' do
    like = FactoryBot.build(:like, spot_id: nil)
    like.valid?
    expect(like.errors.messages[:spot]).to include 'must exist'
  end

  it '同一userで同一spotへのいいねは無効' do
    like = FactoryBot.create(:like)
    like_dup = FactoryBot.build(:like, user_id: like.user.id, spot_id: like.spot.id)
    like_dup.valid?
    expect(like_dup.errors.messages[:spot_id]).to include 'has already been taken'
  end

  it 'userを削除する際に関連するlikeも削除される' do
    like = FactoryBot.create(:like)
    expect { like.user.destroy }.to change(Like, :count).by(-1)
  end

  it 'spotを削除する際に関連するlikeも削除される' do
    like = FactoryBot.create(:like)
    expect { like.spot.destroy }.to change(Like, :count).by(-1)
  end
end
