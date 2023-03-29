# frozen_string_literal: true

class Share < ApplicationRecord
  YT_LINK_FORMAT = %r{\A.*(youtu.be/|v/|u/\w/|embed/|watch\?v=|&v=)([^#&?]*).*}i

  belongs_to :user
  default_scope -> { order(created_at: :desc) }
  validates :url, presence: true, format: YT_LINK_FORMAT, uniqueness: { case_sensitive: false }

  before_save :extract_video_info

  private

  def extract_video_info
    video = Yt::Video.new(id: url.match(YT_LINK_FORMAT)[2])
    self.uid = video.id
    self.title = video.title
    self.description = video.description
    self.likes = video.like_count
    self.dislikes = video.dislike_count
    self.published_at = video.published_at
  rescue Yt::Errors::NoItems
    self.title = ''
  end
end
