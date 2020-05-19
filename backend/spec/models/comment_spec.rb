require 'rails_helper'

RSpec.describe Comment, type: :model do
  let(:user) { FactoryBot.create(:user) }
  let(:spot) { FactoryBot.create(:spot) }

  it 'commentファクトリが有効' do
    comment = FactoryBot.create(:comment)
    expect(comment).to be_valid
  end

  it 'content、user_id、spot_idがあれば有効' do
    comment = Comment.new(
      content: 'example content',
      user_id: user.id,
      spot_id: spot.id
    )
    expect(comment).to be_valid
  end

  it 'contentがなければ無効' do
    comment = FactoryBot.build(:comment, content: nil)
    comment.valid?
    expect(comment.errors.messages[:content]).to include "can't be blank"
  end

  it 'user_idがなければ無効' do
    comment = FactoryBot.build(:comment, user_id: nil)
    comment.valid?
    expect(comment.errors.messages[:user]).to include 'must exist'
  end

  it 'spot_idがなければ無効' do
    comment = FactoryBot.build(:comment, spot_id: nil)
    comment.valid?
    expect(comment.errors.messages[:spot]).to include 'must exist'
  end

  it 'commentが1001文字以上で無効' do
    comment = FactoryBot.build(:comment, content: 'a' * 1001)
    comment.valid?
    expect(comment.errors.messages[:content]).to include 'is too long (maximum is 1000 characters)'
  end

  it 'userを削除する際に関連するcommentも削除される' do
    comment = FactoryBot.create(:comment)
    expect { comment.user.destroy }.to change(Comment, :count).by(-1)
  end

  it 'spotを削除する際に関連するcommentも削除される' do
    comment = FactoryBot.create(:comment)
    expect { comment.spot.destroy }.to change(Comment, :count).by(-1)
  end
end
