class Api::V1::CurrentUserEntriesController < ApiController
  def index
    entries = current_user.entries.group_by { |t| t.created_at.to_date }

    organized_by_date = []
    entries.each { |e| organized_by_date << { date: e.first, entries: e.second } }

    render json: organized_by_date
	end
end
