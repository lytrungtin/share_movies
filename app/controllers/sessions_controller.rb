# frozen_string_literal: true

class SessionsController < ApplicationController
  def create
    @user = User.find_by(email: params[:email].downcase)

    return process_signup! unless @user
    return login_successful if @user.authenticate(params[:password])

    render json: { error: 'Invalid email/password combination' }, status: :unauthorized
  end

  def destroy
    decoded_token = JWT.decode(request.headers['Authorization'].split(' ')[1], ENV['JWT_SECRET_KEY'], true, algorithm: 'HS256')[0]
    JwtBlacklist.create(jti: decoded_token['jti'], exp: decoded_token['exp'])
    render json: { message: 'Logged out successfully' }, status: :ok
  rescue JWT::DecodeError, NoMethodError
    render json: { error: 'Invalid token' }, status: :unauthorized
  end

  private

  def token
    @token ||= JWT.encode({ user_id: @user.id, exp: 24.hours.from_now.to_i, jti: SecureRandom.uuid }, ENV['JWT_SECRET_KEY'], 'HS256')
  end

  def login_successful

    response.headers['Authorization'] = "Bearer #{token}"
    render json: { message: 'Logged in successfully' }, status: :ok
  end

  def signup_successful
    response.headers['Authorization'] = "Bearer #{token}"
    render json: { message: 'Welcome to FUNNY MOVIES!' }, status: :created
  end

  def process_signup!
    @user = User.new(user_params)
    @user.save
    return render json: { error: @user.errors.full_messages }, status: :unprocessable_entity if @user.errors.any?

    signup_successful
  end

  def user_params
    params.permit(:email, :password)
  end
end
