# frozen_string_literal: true

User.create!(
  name: 'テストユーザ',
  email: 'tester@example.com',
  password: 'password',
  password_confirmation: 'password'
)

if Rails.env == 'development'
  10.times do |u|
    User.create!(
      name: Faker::Name.name,
      email: "tester-#{u + 1}@example.com",
      password: 'password',
      password_confirmation: 'password'
    )
  end
end
