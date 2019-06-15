class Api::V1::EntriesController < ApplicationController
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
		params.require(:entry).permit(:amount, :currency, :user_id)
	end
end
