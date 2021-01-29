class RenameImageColumnToSpots < ActiveRecord::Migration[5.2]
  def change
    rename_column :spots, :image, :photo_reference
  end
end
