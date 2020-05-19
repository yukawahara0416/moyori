# frozen_string_literal: true

User.create!(
  name: 'テストユーザ',
  email: 'tester@example.com',
  password: 'password',
  password_confirmation: 'password'
)

if Rails.env == 'development'
  AdminUser.create!(
    email: 'admin@example.com',
    password: 'password',
    password_confirmation: 'password'
  )

  3.times do |u|
    user = User.create!(
      name: Faker::Name.name,
      email: "tester-#{u + 1}@example.com",
      password: 'password',
      password_confirmation: 'password'
    )

    5.times do |s|
      spot = Spot.create!(
        place_id: "place-#{s + 1}@user-#{u + 1}",
        user_id: user.id
      )

      Like.create!(
        user_id: user.id,
        spot_id: spot.id
      )

      WifiWith.create!(
        user_id: user.id,
        spot_id: spot.id
      )

      PowerWith.create!(
        user_id: user.id,
        spot_id: spot.id
      )

      Comment.create!(
        content: 'よきよき',
        user_id: user.id,
        spot_id: spot.id
      )
    end
  end
end
