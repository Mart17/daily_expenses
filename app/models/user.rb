class User < ApplicationRecord
  enum role: [:user, :vip, :admin]
  enum default_currency: ['€', '$', '£']

  has_many :entries, dependent: :destroy

  validates_presence_of :name, :default_currency

  after_initialize :set_default_role, :if => :new_record?

  # Include default devise modules. Others available are:
  # :confirmable, :lockable, :timeoutable, :trackable and :omniauthable
  devise :database_authenticatable, :registerable, :confirmable,
         :recoverable, :rememberable, :validatable

  private

  def set_default_role
    self.role ||= :user
  end
end
