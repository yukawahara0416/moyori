FactoryBot.define do
  factory :spot do
    place_id { Faker::Lorem.characters(number: 15) }
    name { Faker::Company.name }
    address { Faker::Address.full_address }
    lat { Faker::Number.decimal(l_digits: 2, r_digits: 7) }
    lng { Faker::Number.decimal(l_digits: 3, r_digits: 7) }
    phone { Faker::PhoneNumber.cell_phone }
    url { Faker::Internet.url }
    user
  end
end
