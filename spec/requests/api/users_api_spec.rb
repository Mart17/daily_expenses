require 'rails_helper'

describe 'user API requests', type: :request do
  let (:user)            { create(:user) }
  let (:url)             { '/api/v1/current_user_entries' }

  context 'not logged in user' do
    it "can't access the data" do
      get url

      expect(response).to have_http_status(:unauthorized)
      expect(JSON.parse(response.body)['error']).to eq('You need to sign in or sign up before continuing.')
    end
  end

  context 'singed in user' do
    it 'can access the data' do
      sign_in user

      get url

      expect(response).to have_http_status(:ok)
    end
  end
end
