class DeleteColumnSpots < ActiveRecord::Migration[5.2]
  def up
    remove_column :spots, :image
    add_column :spots, :phone, :string, after: :lng
  end

  def down
    add_column :spots, :image, :string
    remove_column :spots, :phone
  end
end
