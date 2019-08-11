FactoryBot.define do
  factory :entry do
    amount { "9.99" }
    currency { 0 }
    name { "Cookies!" }
    user { nil }
  end
end
