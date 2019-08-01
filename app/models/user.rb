class User < ApplicationRecord
  enum role: [:user, :vip, :admin]
  enum default_currency: ['€', '$', '£']

  has_secure_token :authenticity_token

  has_many :entries

  validates_presence_of :name, :default_currency

  # has_secure_token defaultly validates presence only on :create, but including "on: :create"
  # here would validate its presence before it was set by has_secure_token
  validates_presence_of :authenticity_token, on: :update

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
