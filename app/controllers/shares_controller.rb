# frozen_string_literal: true

class SharesController < ApplicationController
  skip_before_action :authenticate_user!, only: [:index]
  def index
    page = params[:page] || 1
    per_page = params[:per_page] || 10
    shares = Share.includes(:user).order(created_at: :desc).page(page).per(per_page)
    total_pages = shares.total_pages

    render json: { data: shares.as_json(include: { user: { only: [:email] } }), meta: { total_pages: } }
  end

  def create
    share = @current_user.shares.build(share_params)
    if share.save
      render json: share, status: :created
    else
      render json: { errors: share.errors }, status: :unprocessable_entity
    end
  end

  private

  def share_params
    params.require(:share).permit(:url)
  end
end
