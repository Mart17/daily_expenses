require 'rails_helper'

describe 'user API requests', type: :request do
  let (:user)            { create(:user) }
  let (:incorrect_user)  { create(:user, name: 'Incorrect User', email: 'incorrect@user.com') }
  let! (:entry)          { create(:entry, user_id: user.id) }
  let (:url)             { "/api/v1/users/#{user.id}.json" }

  context 'not logged in user' do
    it "can't access the data" do
      get url

      expect(response).to have_http_status(:unauthorized)
      expect(JSON.parse(response.body)['error']).to eq('You need to sign in or sign up before continuing.')
    end
  end

  context 'incorrect user' do
    it "can't access the data" do
      sign_in incorrect_user

      get url

      expect(response).to have_http_status(:unauthorized)
      expect(JSON.parse(response.body)['error']).to eq("You're not authorized to access this data.")
    end
  end

  context 'correct user' do
    it 'can access the data' do
      sign_in user

      get url

      expect(response).to have_http_status(:ok)
    end
  end
end
