class AddColumnImageToSpot < ActiveRecord::Migration[5.2]
  def up
    add_column :spots, :image, :text, after: :lng
  end

  def down
    remove_column :spots, :image, :string
  end
end
