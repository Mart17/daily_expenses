class AddDefaultCurrencyToUsers < ActiveRecord::Migration[5.2]
  def change
    add_column :users, :default_currency, :integer
  end
end
