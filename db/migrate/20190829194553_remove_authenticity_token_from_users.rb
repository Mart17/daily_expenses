class RemoveAuthenticityTokenFromUsers < ActiveRecord::Migration[5.2]
  def change
    remove_column :users, :authenticity_token, :string
  end
end
