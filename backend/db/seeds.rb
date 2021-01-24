# frozen_string_literal: true

require 'csv'

# 管理者
AdminUser.create!(
  email: 'admin@example.com',
  password: 'password'
)

# テストユーザ
User.create!(
  name: 'テストユーザ',
  email: 'tester@example.com',
  password: 'password'
)

user = User.find(1)
user.avatar.attach(io: File.open(Rails.root.join('app/assets/images/1.png')), filename: '1.png')

# GoogleMap固有のスポット20件
CSV.foreach(Rails.root.join('db/csv/spot.csv'), headers: true) do |row|
  user.spots.create!(
    place_id: row[1],
    name: row[2],
    address: row[3],
    lat: row[4],
    lng: row[5],
    image: row[6],
    phone: row[7],
    url: row[8]
  )
end

# 実用データ用ユーザ10人
10.times do |u|
  user = User.create!(
    name: Faker::Name.name,
    email: "tester-#{u + 1}@example.com",
    password: 'password'
  )

  user.avatar.attach(io: File.open(Rails.root.join("app/assets/images/#{u + 1}.png")), filename: "#{u + 1}.png")

  # いいね
  ids = (1..20).to_a.sample(10)

  ids.each do |id|
    user.likes.create!(
      spot_id: id
    )
  end


#       WifiWith.create!(
#         user_id: user.id,
#         spot_id: spot.id
#       )

#       PowerWith.create!(
#         user_id: user.id,
#         spot_id: spot.id
#       )

end
