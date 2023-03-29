# frozen_string_literal: true

class Share < ApplicationRecord
  YT_LINK_FORMAT = %r{\A.*(youtu.be/|v/|u/\w/|embed/|watch\?v=|&v=)([^#&?]*).*}i

  belongs_to :user
  default_scope -> { order(created_at: :desc) }
  validates :url, presence: true, format: YT_LINK_FORMAT, uniqueness: { case_sensitive: false }
end
