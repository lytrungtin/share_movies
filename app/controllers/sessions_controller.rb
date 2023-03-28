# frozen_string_literal: true

class SessionsController < ApplicationController
  def create
    @user = User.find_by(email: params[:email].downcase)
    
    return process_signup! unless @user
    return login_successful if @user.authenticate(params[:password])
    render json: { error: 'Invalid email/password combination' }, status: :unauthorized
  end

  private

  def login_successful
    token = JWT.encode({ user_id: @user.id }, Rails.application.secret_key_base)
    render json: { message: 'Logged in successfully', token: token }, status: :ok
  end
  
  def signup_successful
    token = JWT.encode({ user_id: @user.id }, Rails.application.secret_key_base)
    render json: { message: 'Welcome to FUNNY MOVIES!', token: token}, status: :created
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
