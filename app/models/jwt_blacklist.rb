# frozen_string_literal: true

class JwtBlacklist < ApplicationRecord
  self.primary_key = :jti

  def self.blacklisted?(jti)
    # check if the JWT with the given jti has been blacklisted
    exists?(jti:)
  end
end
