# frozen_string_literal: true

require 'test_helper'

class JwtBlacklistTest < ActiveSupport::TestCase
  test 'should create new record in the blacklist table' do
    jti = 'abc123'
    exp = Time.now.to_i + 3600 # expires in 1 hour
    assert_difference('JwtBlacklist.count') do
      JwtBlacklist.create(jti:, exp:)
    end
  end

  test 'should return true if token is blacklisted' do
    jti = 'def456'
    exp = Time.now.to_i + 3600 # expires in 1 hour
    JwtBlacklist.create(jti:, exp:)
    assert_equal true, JwtBlacklist.blacklisted?(jti)
  end

  test 'should return false if token is not blacklisted' do
    jti = 'ghi789'
    assert_equal false, JwtBlacklist.blacklisted?(jti)
  end
end
