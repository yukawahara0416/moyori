FactoryBot.define do
  factory :comment do
    content { Faker::Lorem.characters(number: 100) }
    user
    spot
  end
end
