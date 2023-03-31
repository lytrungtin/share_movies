# frozen_string_literal: true

class Share < ApplicationRecord
  YT_LINK_FORMAT = %r{\A.*(youtu.be/|v/|u/\w/|embed/|watch\?v=|&v=)([^#&?]*).*\z}i

  belongs_to :user
  default_scope -> { order(created_at: :desc) }
  validates :url, presence: true, format: YT_LINK_FORMAT,
                  uniqueness: { case_sensitive: false, message: I18n.t('errors.messages.url_already_taken') }
  validates :uid, uniqueness: { case_sensitive: false, message: I18n.t('errors.messages.video_already_taken') }
  validates :published_at, presence: { message: I18n.t('errors.messages.video_unavailable') }

  before_validation :extract_video_info

  private

  def video
    @video ||= Yt::Video.new(id: url.match(YT_LINK_FORMAT)[2])
  end

  def video_id
    video.id
  end

  def video_title
    video.title
  end

  def video_description
    video.description
  end

  def video_like_count
    video.like_count
  rescue NoMethodError
    0
  end

  def video_dislike_count
    video.dislike_count
  end

  def video_published_at
    video.published_at
  end

  def extract_video_info
    self.uid = video_id
    self.title = video_title
    self.description = video_description
    self.likes = video_like_count
    self.dislikes = video_dislike_count
    self.published_at = video_published_at
  rescue StandardError
    errors.add(:url, 'This video is invalid')
  end
end
