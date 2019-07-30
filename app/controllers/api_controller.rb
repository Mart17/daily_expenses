class ApiController < ApplicationController
  before_action :set_default_response_format
  before_action :authenticate_token!
  before_action :authenticate_user!

  private

  def authenticate_token!
    # TODO or missing ['Authentication-Token']
    if request.headers['Authentication-Token'] != current_user.authenticity_token
      render status: :unauthorized, json: { error: "You're missing correct authenticity token." }
    end
  end

  def set_default_response_format
    request.format = :json
  end
end
