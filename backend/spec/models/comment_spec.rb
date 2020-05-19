require 'rails_helper'

RSpec.describe Comment, type: :model do
  let(:user) { FactoryBot.create(:user) }
  let(:spot) { FactoryBot.create(:spot) }

  it 'commentファクトリが有効' do
    comment = FactoryBot.create(:comment)
    expect(comment).to be_valid
  end
end
