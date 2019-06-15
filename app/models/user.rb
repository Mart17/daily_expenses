class User < ApplicationRecord
  enum role: [:user, :vip, :admin]

  has_many :entries

  validates_presence_of :name

  after_initialize :set_default_role, :if => :new_record?

  # Include default devise modules. Others available are:
  # :confirmable, :lockable, :timeoutable, :trackable and :omniauthable
  devise :database_authenticatable, :registerable, :confirmable,
         :recoverable, :rememberable, :validatable

  def set_default_role
    self.role ||= :user
  end
end
