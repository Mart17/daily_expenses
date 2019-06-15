class Api::V1::EntriesController < ApiController
  before_action :set_entry, except: :create
  before_action :correct_user, except: :create

	def create
		entry = current_user.entries.create!(entry_params)

		render json: entry
	end

	def update
		@entry.update_attributes(entry_params)

		render json: entry
	end

	def destroy
		entry = Entry.find(params[:id])

		@entry.destroy
	end

	private

	def entry_params
		params.require(:entry).permit(:amount, :currency, :user_id)
	end

  def set_entry
    @entry = Entry.find(params[:id])
  end

  def correct_user
    head :not_acceptable unless current_user == @user
  end
end
