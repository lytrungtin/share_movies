# frozen_string_literal: true

class SharesController < ApplicationController
  def index
    page = params[:page] || 1
    per_page = params[:per_page] || 10
    shares = Share.order(created_at: :desc).page(page).per(per_page)
    total_pages = shares.total_pages

    render json: { data: shares, meta: { total_pages: } }
  end
end
