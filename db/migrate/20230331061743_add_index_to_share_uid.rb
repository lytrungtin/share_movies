# frozen_string_literal: true

class AddIndexToShareUid < ActiveRecord::Migration[7.0]
  def change
    remove_index :shares, :uid
    add_index :shares, :uid, unique: true
  end
end
