# frozen_string_literal: true

class CreateShares < ActiveRecord::Migration[7.0]
  def change
    create_shares_table
    add_user_id_index_to_shares
    add_uid_index_to_shares
    add_url_index_to_shares
  end

  private

  def create_shares_table
    create_table :shares do |t|
      add_share_columns(t)
      add_user_reference(t)
      t.timestamps
    end
  end

  def add_share_columns(table)
    table.string :url
    table.string :title
    tablet.text :description
    table.datetime :published_at
    table.integer :likes
    table.integer :dislikes
    table.string :uid
  end

  def add_user_reference(table)
    table.references :user, foreign_key: true
  end

  def add_user_id_index_to_shares
    add_index :shares, %i[user_id created_at]
  end

  def add_uid_index_to_shares
    add_index :shares, :uid
  end

  def add_url_index_to_shares
    add_index :shares, :url, unique: true
  end
end
