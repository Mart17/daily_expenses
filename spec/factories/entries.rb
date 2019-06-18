FactoryBot.define do
  factory :entry do
    amount { "9.99" }
    currency { "Cookie Currency" }
    user { nil }
  end
end
