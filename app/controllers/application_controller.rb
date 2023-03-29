# frozen_string_literal: true

class ApplicationController < ActionController::API
  before_action :authenticate_user!

  private

  def jwt_secret_key
    @jwt_secret_key ||= Rails.application.credentials.secret_key_base || ENV['JWT_SECRET_KEY']
  end

  def authenticate_user!
    token = request.headers['Authorization'].to_s.split(' ').last
    payload = JWT.decode(token, jwt_secret_key, true, algorithm: 'HS256')[0]
    if payload['exp'] < Time.now.to_i
      render json: { error: 'Token is expired' }, status: :unauthorized
    elsif JwtBlacklist.blacklisted?(payload['jti'])
      render json: { error: 'Token is revoked' }, status: :unauthorized
    else
      @current_user = User.find(payload['user_id'])
    end
  rescue JWT::ExpiredSignature
    render json: { error: 'Token is expired' }, status: :unauthorized
  rescue JWT::DecodeError => e
    render json: { error: 'Invalid token' }, status: :unauthorized
  end
end
