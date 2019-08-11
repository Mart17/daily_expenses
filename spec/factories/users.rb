FactoryBot.define do
  factory :user do
    name { 'Test User' }
    email { 'test@example.com' }
    password { 'password123' }
    confirmation_token { SecureRandom.hex }
    confirmed_at { Time.now }
    confirmation_sent_at { Time.now - 60.seconds }
    default_currency { 0 }
  end
end
