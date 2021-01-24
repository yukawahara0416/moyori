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

#     5.times do |s|
#       spot = Spot.create!(
#         place_id: "place-#{s + 1}@user-#{u + 1}",
#         user_id: user.id
#       )

#       Like.create!(
#         user_id: user.id,
#         spot_id: spot.id
#       )

#       WifiWith.create!(
#         user_id: user.id,
#         spot_id: spot.id
#       )

#       PowerWith.create!(
#         user_id: user.id,
#         spot_id: spot.id
#       )

#       Comment.create!(
#         content: 'よきよき',
#         user_id: user.id,
#         spot_id: spot.id
#       )
#     end
#   end
# end
