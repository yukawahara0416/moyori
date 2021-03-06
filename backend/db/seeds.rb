# frozen_string_literal: true

require 'csv'
require './db/csv/comment.rb'

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
    photo_reference: row[6],
    phone: row[7],
    url: row[8]
  )
end

# 実用データ用ユーザ10人
10.times do |u|
  user = User.create!(
    name: Gimei.kanji,
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

  # Wifiあるよ
  ids = (1..20).to_a.sample(10)
  ids.each do |id|
    wifi_with = user.wifi_withs.create(spot_id: id)
    wifi_with.update_attribute :created_at, (rand * 10).days.ago
  end

  # Wifiないよ
  other_ids = (1..20).to_a
  ids.each do |id|
    other_ids.delete(id)
  end

  other_ids.sample(3).each do |id|
    wifi_without = user.wifi_withouts.create(spot_id: id)
    wifi_without.update_attribute :created_at, (rand * 10).days.ago
  end

  # 電源あるよ
  ids = (1..20).to_a.sample(10)
  ids.each do |id|
    power_with = user.power_withs.create(spot_id: id)
    power_with.update_attribute :created_at, (rand * 10).days.ago
  end

  # 電源ないよ
  other_ids = (1..20).to_a
  ids.each do |id|
    other_ids.delete(id)
  end

  other_ids.sample(3).each do |id|
    power_without = user.power_withouts.create(spot_id: id)
    power_without.update_attribute :created_at, (rand * 10).days.ago
  end
end

# コメント
20.times do |u|
  5.times do |i|
    user = User.find(rand(2..11))
    user.comments.create!(spot_id: u + 1, content: comment[u][i])
  end
end
