FactoryBot.define do
  factory :spot do
    place_id { 'MyString' }
    title { 'MyString' }
    adress { 'MyString' }
    lat { '9.99' }
    lng { '9.99' }
    image { 'MyString' }
    url { 'MyString' }
    user { nil }
  end
end
