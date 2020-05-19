class CreatePowerWithouts < ActiveRecord::Migration[5.2]
  def change
    create_table :power_withouts do |t|
      t.references :user, foreign_key: true
      t.references :spot, foreign_key: true

      t.timestamps
    end
  end
end
