# frozen_string_literal: true

class CreateShares < ActiveRecord::Migration[7.0]
  def change
    create_table :shares do |t|
      t.string :url
      t.string :title
      t.text :description
      t.datetime :published_at
      t.integer :likes
      t.integer :dislikes
      t.string :uid
      t.references :user, foreign_key: true

      t.timestamps
    end
    add_index :shares, %i[user_id created_at]
    add_index :shares, :uid
    add_index :shares, :url, unique: true
  end
end
