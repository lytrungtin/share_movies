# frozen_string_literal: true

require 'test_helper'
require 'minitest/mock'

class ShareTest < ActiveSupport::TestCase
  def setup
    @user = users(:tintin)
    @share = @user.shares.build(url: 'https://www.youtube.com/watch?v=qAQHz2zPFFQ')
  end

  test 'should be valid' do
    assert @share.valid?
  end

  test 'user id should be present' do
    @share.user_id = nil
    assert_not @share.valid?
  end

  test 'url should be present' do
    @share.url = nil
    assert_not @share.valid?
  end

  test 'url should be a valid youtube link' do
    @share.url = 'https://www.example.com'
    assert_not @share.valid?
  end

  test 'url should be unique' do
    duplicate_share = @share.dup

    Yt::Video.stub :new, yt_video_mock do
      @share.save
    end
    assert_not duplicate_share.valid?
  end

  test 'order should be most recent first' do
    assert_equal shares(:cho_toi_lang_thang), Share.first
  end

  test 'should extract video info from YouTube API' do
    Yt::Video.stub :new, yt_video_mock do
      @share.save
      assert_equal 'abcDEF12345', @share.uid
      assert_equal 'Test video', @share.title
      assert_equal 'A test video', @share.description
      assert_equal 10, @share.likes
      assert_equal 5, @share.dislikes
      assert_equal '2023-03-29 11:18:00.170808 +0700'.to_datetime, @share.published_at
    end
  end

  def yt_video_mock
    return @video_info if @video_info.present?

    @video_info ||= MiniTest::Mock.new
    @video_info.expect :id, 'abcDEF12345'
    @video_info.expect :title, 'Test video'
    @video_info.expect :description, 'A test video'
    @video_info.expect :like_count, 10
    @video_info.expect :dislike_count, 5
    @video_info.expect :published_at, '2023-03-29 11:18:00.170808 +0700'.to_datetime
    @video_info
  end
end
