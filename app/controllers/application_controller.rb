# frozen_string_literal: true

class ApplicationController < ActionController::API
  before_action :authenticate_user!

  private

  def jwt_secret_key
    @jwt_secret_key ||= Rails.application.credentials.secret_key_base || ENV.fetch('JWT_SECRET_KEY', nil)
  end

  def authenticate_user!
    payload = JWT.decode(request.headers['Authorization'].to_s.split.last, jwt_secret_key, true, algorithm: 'HS256')[0]
    if JwtBlacklist.blacklisted?(payload['jti'])
      return render json: { error: 'Token is revoked' }, status: :unauthorized
    end

    @current_user = User.find(payload['user_id'])
  rescue JWT::ExpiredSignature
    render json: { error: 'Token is expired' }, status: :unauthorized
  rescue JWT::DecodeError
    render json: { error: 'Invalid token' }, status: :unauthorized
  end
end
