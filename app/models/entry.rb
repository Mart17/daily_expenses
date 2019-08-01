class Entry < ApplicationRecord
  enum currency: ['€', '$', '£']

  belongs_to :user

  validates_presence_of :user_id, :amount, :currency, :name
end
