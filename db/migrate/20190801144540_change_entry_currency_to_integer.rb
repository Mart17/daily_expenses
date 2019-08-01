class ChangeEntryCurrencyToInteger < ActiveRecord::Migration[5.2]
  def change
    remove_column :entries, :currency, :string

    add_column :entries, :currency, :integer
  end
end
