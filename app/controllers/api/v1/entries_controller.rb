class Api::V1::EntriesController < ApiController
  before_action :set_entry, except: :create
  before_action :correct_user, except: :create

	def create
		entry = current_user.entries.create!(entry_params)

		render json: entry
	end

	def update
		@entry.update_attributes(entry_params)

		render json: @entry
	end

	def destroy
		entry = Entry.find(params[:id])

		@entry.destroy
	end

	private

	def entry_params
		params.require(:entry).permit(:name, :amount, :currency)
	end

  def set_entry
    @entry = Entry.find(params[:id])
  end

  def correct_user
    unless current_user == @entry.user
      render status: :unauthorized, json: { error: "You're not authorized to access this data." }
    end
  end
end
