class ApiController < ApplicationController
  before_action :set_default_response_format
  before_action :set_csrf_cookie
  before_action :authenticate_user!

  private

  def set_csrf_cookie
    cookies['CSRF-TOKEN'] = form_authenticity_token
  end

  def set_default_response_format
    request.format = :json
  end
end
