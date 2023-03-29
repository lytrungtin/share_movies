# frozen_string_literal: true

require 'test_helper'

class SharesControllerTest < ActionDispatch::IntegrationTest
  setup do
    @user = users(:tintin)
    @headers = { 'ACCEPT' => 'application/json' }
    @jwt_secret_key = Rails.application.credentials.secret_key_base || ENV['JWT_SECRET_KEY']
    @payload = { user_id: @user.id, exp: (Time.now + 1.hour).to_i, jti: SecureRandom.uuid }
    @token = JWT.encode(@payload, @jwt_secret_key, 'HS256')
    @expired_payload = { user_id: @user.id, exp: (Time.now - 1.hour).to_i, jti: SecureRandom.uuid }
    @expired_token = JWT.encode(@expired_payload, @jwt_secret_key, 'HS256')
    @revoked_payload = { user_id: @user.id, exp: (Time.now + 1.hour).to_i, jti: SecureRandom.uuid }
    JwtBlacklist.create(jti: @revoked_payload[:jti], exp: @revoked_payload[:exp])
    @revoked_token = JWT.encode(@revoked_payload, @jwt_secret_key, 'HS256')
  end

  test 'should get shares with paging' do
    per = 2
    total_shares = Share.count
    get shares_path, params: { page: 1, per_page: per }, headers: { 'Accept': 'application/json' }
    assert_response :success
    total_pages = (total_shares.to_f / per).ceil

    json_response = JSON.parse(response.body)
    size = total_shares > per ? per : total_shares
    assert_equal size, json_response['data'].size
    assert_equal total_pages, json_response['meta']['total_pages']
  end

  test 'should create share' do
    assert_difference('Share.count') do
      post shares_url, params: { share: { url: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ' } },
                       headers: @headers.merge('Authorization' => "Bearer #{@token}")
    end

    assert_response :created

    assert_difference('Share.count') do
      post shares_url, params: { share: { url: 'https://www.youtube.com/watch?v=yKNxeF4KMsY&list=RDCLAK5uy_mfut9V_o1n9nVG_m5yZ3ztCif29AHUffI&start_radio=1&rv=dQw4w9WgXcQ' } },
                       headers: @headers.merge('Authorization' => "Bearer #{@token}")
    end

    assert_response :created
  end

  test 'should not authenticate user with expired token' do
    post shares_url, params: { share: { url: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ' } },
                     headers: @headers.merge('Authorization' => "Bearer #{@expired_token}")
    assert_response :unauthorized
    assert_equal 'Token is expired', JSON.parse(response.body)['error']
  end

  test 'should not authenticate user with revoked token' do
    post shares_url, params: { share: { url: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ' } },
                     headers: @headers.merge('Authorization' => "Bearer #{@revoked_token}")
    assert_response :unauthorized
    assert_equal 'Token is revoked', JSON.parse(response.body)['error']
  end

  test 'should not authenticate user with invalid token' do
    post shares_url, params: { share: { url: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ' } },
                     headers: @headers.merge('Authorization' => 'Bearer invalid_token')
    assert_response :unauthorized
    assert_equal 'Invalid token', JSON.parse(response.body)['error']
  end
end
