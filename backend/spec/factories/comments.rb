FactoryBot.define do
  factory :comment do
    content { 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.' }
    user
    spot
  end
end
