class Api::V1::EntriesController < ApiController
  #before_action :correct_user
  # TODO use current_user.entry.build etc for user_id

	def create
		entry = Entry.create!(entry_params)

		render json: entry
	end

	def update
		entry = Entry.find(params[:id])

		entry.update_attributes(entry_params)

		render json: entry
	end

	def destroy
		entry = Entry.find(params[:id])

		entry.destroy
	end

	private

	def entry_params
		params.require(:entry).permit(:amount, :currency)
	end

  def correct_user
    # TODO current_user == ...
  end
end
