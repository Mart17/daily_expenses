class ChangeEntryAmountToDecimal < ActiveRecord::Migration[5.2]
  def change
    remove_column :entries, :amount, :string

    add_column :entries, :amount, :decimal, precision: 8, scale: 2
  end
end
