class Api::V1::UsersController < ApiController
  before_action :set_user
  before_action :correct_user

  def show
    user = User.find(params[:id])

		render json: user.entries
	end

  private

  def set_user
    @user = User.find(params[:id])
  end

  def correct_user
    unless current_user == @user
      render status: :unauthorized, json: { error: "You're not authorized to access this data." }
    end
  end
end
