FactoryBot.define do
  factory :spot do
    place_id { 'ChIJQXd-okSTQTUROq23p7mb_A0' }
    title { 'ノムカ+cafe' }
    adress { '福岡市西区姪浜駅南２丁目１−３７ メディカルビル竹下 103' }
    lat { '33.5837453' }
    lng { '130.3252607' }
    image { 'MyString' }
    url { 'https://www.facebook.com/%E3%83%8E%E3%83%A0%E3%82%ABcafe-773523892812003/' }
    user
  end
end
