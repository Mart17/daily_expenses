class Entry < ApplicationRecord
  belongs_to :user

  validates_presence_of :user_id, :amount, :currency 
end
