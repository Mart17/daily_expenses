class MainPagesController < ApplicationController
  def home
    if current_user
      current_user.regenerate_authenticity_token

      @auth_token       = current_user.authenticity_token
      @default_currency = current_user.default_currency
    end
  end
end
