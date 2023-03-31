# frozen_string_literal: true

Yt.configure do |config|
  config.api_key = ENV.fetch('YT_API_KEY', nil)
  config.log_level = :debug unless Rails.env.production?
end
