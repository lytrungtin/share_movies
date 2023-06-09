# frozen_string_literal: true

require 'test_helper'

class SessionsControllerTest < ActionDispatch::IntegrationTest
  setup do
    @user = User.create(email: 'test@example.com', password: 'password')
    @jwt_secret_key = Rails.application.credentials.secret_key_base || ENV.fetch('JWT_SECRET_KEY', nil)
    @auth_headers = { 'Authorization' => "Bearer #{JWT.encode(
      { user_id: @user.id, exp: 24.hours.from_now.to_i, jti: SecureRandom.uuid }, @jwt_secret_key
    )}" }
  end

  test 'should log in successfully with correct credentials' do
    post login_url, params: { email: @user.email, password: 'password' }
    assert_response :success
    assert_equal 'Logged in successfully', response.parsed_body['message']
    assert_not_nil response.parsed_body['token']
    decoded_token = JWT.decode(response.parsed_body['token'], @jwt_secret_key, true, algorithm: 'HS256')
    assert_equal @user.id, decoded_token[0]['user_id']
  end

  test 'should return error with incorrect credentials' do
    post login_url, params: { email: @user.email, password: 'wrong_password' }
    assert_response :unauthorized
    assert_equal 'Invalid email/password combination', response.parsed_body['error']
    assert_nil response.parsed_body['token']
  end

  test 'should create new user and log in successfully with valid params' do
    assert_difference 'User.count' do
      post login_url, params: { email: 'new_user@example.com', password: 'password' }
    end
    assert_response :success
    assert_equal 'Welcome to FUNNY MOVIES!', response.parsed_body['message']
    assert_not_nil response.parsed_body['token']
    decoded_token = JWT.decode(response.parsed_body['token'], @jwt_secret_key, true, algorithm: 'HS256')
    assert_equal User.last.id, decoded_token[0]['user_id']
  end

  test 'should return error with invalid params' do
    assert_no_difference 'User.count' do
      post login_url, params: { email: 'invalid_email', password: '' }
    end
    assert_response :unprocessable_entity
    assert_includes response.parsed_body['error'], 'Email is invalid'
    assert_includes response.parsed_body['error'], "Password can't be blank"
    assert_nil response.headers['Authorization']
  end

  test 'should log out successfully' do
    assert_difference 'JwtBlacklist.count' do
      delete logout_url, headers: @auth_headers
    end
    assert_response :success
    assert_equal 'Logged out successfully', response.parsed_body['message']
    assert_nil response.headers['Authorization']
  end
end
