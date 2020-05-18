FactoryBot.define do
  factory :admin_user do
    sequence(:email) { |n| "#{n}_" + Faker::Internet.email }
    password         { Faker::Internet.password(min_length: 8) }
  end
end
