class Api::V1::CurrentUserEntriesController < ApiController
  def index
    entries = current_user.entries.order(created_at: :desc).group_by { |t| t.created_at.to_date }

    organized_by_date = entries.map { |e| { date: e.first, entries: e.second } }

    render json: organized_by_date
	end
end
