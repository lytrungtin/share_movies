require 'test_helper'

class SessionsControllerTest < ActionDispatch::IntegrationTest
  setup do
    @user = User.create(email: 'test@example.com', password: 'password')
    @auth_headers = { 'Authorization' => "Bearer #{JWT.encode({user_id: @user.id}, ENV['JWT_SECRET_KEY'])}" }
  end

  test "should log in successfully with correct credentials" do
    post login_url, params: { email: @user.email, password: 'password' }
    assert_response :success
    assert_equal 'Logged in successfully', JSON.parse(response.body)['message']
    assert_not_nil response.headers['Authorization']
    decoded_token = JWT.decode(response.headers['Authorization'].split(' ')[1], ENV['JWT_SECRET_KEY'], true, algorithm: 'HS256')
    assert_equal @user.id, decoded_token[0]['user_id']
  end

  test "should return error with incorrect credentials" do
    post login_url, params: { email: @user.email, password: 'wrong_password' }
    assert_response :unauthorized
    assert_equal 'Invalid email/password combination', JSON.parse(response.body)['error']
    assert_nil response.headers['Authorization']
  end

  test "should create new user and log in successfully with valid params" do
    assert_difference 'User.count' do
      post login_url, params: { email: 'new_user@example.com', password: 'password' }
    end
    assert_response :success
    assert_equal 'Welcome to FUNNY MOVIES!', JSON.parse(response.body)['message']
    assert_not_nil response.headers['Authorization']
    decoded_token = JWT.decode(response.headers['Authorization'].split(' ')[1], ENV['JWT_SECRET_KEY'], true, algorithm: 'HS256')
    assert_equal User.last.id, decoded_token[0]['user_id']
  end

  test "should return error with invalid params" do
    assert_no_difference 'User.count' do
      post login_url, params: { email: 'invalid_email', password: '' }
    end
    assert_response :unprocessable_entity
    assert_includes JSON.parse(response.body)['error'], "Email is invalid"
    assert_includes JSON.parse(response.body)['error'], "Password can't be blank"
    assert_nil response.headers['Authorization']
  end
end