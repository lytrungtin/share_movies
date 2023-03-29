# frozen_string_literal: true

require 'test_helper'

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
    @share.save
    assert_not duplicate_share.valid?
  end

  test 'order should be most recent first' do
    assert_equal shares(:cho_toi_lang_thang), Share.first
  end
end
