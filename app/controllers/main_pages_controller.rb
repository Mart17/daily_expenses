class MainPagesController < ApplicationController
  def home
    @default_currency = current_user.default_currency if current_user
  end
end
