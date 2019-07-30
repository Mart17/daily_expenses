class ApiController < ApplicationController
  before_action :set_default_response_format
  before_action :authenticate_user!
  before_action :authenticate_token!

  private

  def authenticate_token!
    token = request.headers['Authentication-Token']

    if token.nil? || token != current_user.authenticity_token
      render status: :unauthorized, json: { error: "You're missing correct authenticity token." }
    end
  end

  def set_default_response_format
    request.format = :json
  end
end
