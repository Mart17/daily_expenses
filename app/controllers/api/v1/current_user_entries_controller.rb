class Api::V1::CurrentUserEntriesController < ApiController
  def index
		render json: current_user.entries
	end
end
