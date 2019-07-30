class MainPagesController < ApplicationController
  def home
    if current_user
      current_user.regenerate_authenticity_token

      @auth_token = current_user.authenticity_token
    end
  end
end
