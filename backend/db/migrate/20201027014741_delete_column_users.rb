class DeleteColumnUsers < ActiveRecord::Migration[5.2]
  def up
    remove_column :users, :image
    remove_column :users, :nickname
  end

  def down
    add_column :users, :image
    add_column :users, :nickname
  end
end
