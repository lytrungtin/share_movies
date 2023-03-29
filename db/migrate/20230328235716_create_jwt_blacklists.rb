# frozen_string_literal: true

class CreateJwtBlacklists < ActiveRecord::Migration[7.0]
  def change
    create_table :jwt_blacklists, id: false do |t|
      t.string :jti, null: false
      t.integer :exp, null: false

      t.timestamps
    end

    add_index :jwt_blacklists, :jti, unique: true
  end
end
