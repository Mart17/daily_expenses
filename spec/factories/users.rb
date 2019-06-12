FactoryBot.define do
  factory :user do
    name { 'Test User' }
    email { 'test@example.com' }
    password { 'password123' }
    confirmation_token { 'abc_token_123' }
    confirmed_at { Time.now }
    confirmation_sent_at { Time.now - 60.seconds }
  end
end
