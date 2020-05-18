class CreateSpots < ActiveRecord::Migration[5.2]
  def change
    create_table :spots do |t|
      t.string :place_id
      t.string :title
      t.string :adress
      t.decimal :lat, precision: 9, scale: 6
      t.decimal :lng, precision: 9, scale: 6
      t.string :image
      t.string :url
      t.references :user, foreign_key: true

      t.timestamps
    end
  end
end
