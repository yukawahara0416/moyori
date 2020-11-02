class AddUniquenessPlaceId < ActiveRecord::Migration[5.2]
  def up
    add_index :spots, :place_id, unique: true
  end

  def down
    remove_index :spots, column: :place_id
  end
end
