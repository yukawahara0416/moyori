class AddNullConstraint < ActiveRecord::Migration[5.2]
  def up
    change_column_null :spots, :place_id, false
    change_column_null :spots, :user_id, false
    change_column_null :users, :name, false
    change_column_null :users, :email, false
    change_column_null :likes, :user_id, false
    change_column_null :likes, :spot_id, false
    change_column_null :comments, :content, false
    change_column_null :comments, :user_id, false
    change_column_null :comments, :spot_id, false
    change_column_null :wifi_withs, :user_id, false
    change_column_null :wifi_withs, :spot_id, false
    change_column_null :wifi_withouts, :user_id, false
    change_column_null :wifi_withouts, :spot_id, false
    change_column_null :power_withs, :user_id, false
    change_column_null :power_withs, :spot_id, false
    change_column_null :power_withouts, :user_id, false
    change_column_null :power_withouts, :spot_id, false
  end
  def down
    change_column_null :spots, :place_id, true
    change_column_null :spots, :user_id, true
    change_column_null :users, :name, true
    change_column_null :users, :email, true
    change_column_null :likes, :user_id, true
    change_column_null :likes, :spot_id, true
    change_column_null :comments, :content, true
    change_column_null :comments, :user_id, true
    change_column_null :comments, :spot_id, true
    change_column_null :wifi_withs, :user_id, true
    change_column_null :wifi_withs, :spot_id, true
    change_column_null :wifi_withouts, :user_id, true
    change_column_null :wifi_withouts, :spot_id, true
    change_column_null :power_withs, :user_id, true
    change_column_null :power_withs, :spot_id, true
    change_column_null :power_withouts, :user_id, true
    change_column_null :power_withouts, :spot_id, true
  end
end
