FactoryBot.define do
  factory :entry do
    amount { "9.99" }
    currency { "MyString" }
    user { nil }
  end
end
