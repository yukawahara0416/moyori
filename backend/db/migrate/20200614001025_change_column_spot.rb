class ChangeColumnSpot < ActiveRecord::Migration[5.2]
  def change
    rename_column :spots, :adress, :address
    rename_column :spots, :title, :name
  end
end
