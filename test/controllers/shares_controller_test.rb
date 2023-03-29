# frozen_string_literal: true

require 'test_helper'

class SharesControllerTest < ActionDispatch::IntegrationTest
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
end
