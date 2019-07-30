require 'rails_helper'

describe 'entries API requests', type: :request do
  let (:user)            { create(:user) }
  let (:incorrect_user)  { create(:user, name: 'Incorrect User', email: 'incorrect@user.com') }
  let (:entry)           { create(:entry, user_id: user.id) }

  let (:params)          { { entry: { name: 'Ticket', amount: '1.52', currency: 'USD' } } }
  let (:sing_in_msg)     { 'You need to sign in or sign up before continuing.' }
  let (:auth_msg)        { "You're not authorized to access this data." }

  context 'not logged in user' do
    it "can't create new entry" do
      post '/api/v1/entries', params: params

      expect(response).to have_http_status(:unauthorized)
      expect(JSON.parse(response.body)['error']).to eq(sing_in_msg)
      expect(Entry.count).to eql(0)
    end

    it "can't update entry" do
      put "/api/v1/entries/#{entry.id}", params: params

      expect(response).to have_http_status(:unauthorized)
      expect(JSON.parse(response.body)['error']).to eq(sing_in_msg)
    end

    it "can't delete entry" do
      delete "/api/v1/entries/#{entry.id}"

      expect(response).to have_http_status(:unauthorized)
      expect(JSON.parse(response.body)['error']).to eq(sing_in_msg)
      expect(Entry.count).to eql(1)
    end
  end

  context 'incorrect user' do
    before do
      sign_in incorrect_user
    end

    it "can't update entry" do
      put "/api/v1/entries/#{entry.id}", headers: { 'Authentication-Token':
        incorrect_user.authenticity_token }, params: params

      expect(response).to have_http_status(:unauthorized)
      expect(JSON.parse(response.body)['error']).to eq(auth_msg)
    end

    it "can't delete entry" do
      delete "/api/v1/entries/#{entry.id}", headers: { 'Authentication-Token':
        incorrect_user.authenticity_token }

      expect(response).to have_http_status(:unauthorized)
      expect(JSON.parse(response.body)['error']).to eq(auth_msg)
      expect(Entry.count).to eql(1)
    end
  end

  context 'correct user' do
    before do
      sign_in user
    end

    it "can create new entry" do
      post '/api/v1/entries', headers: { 'Authentication-Token': user.authenticity_token },
        params: params

      expect(response).to have_http_status(:ok)
      expect(Entry.count).to eql(1)
    end

    it "can update entry" do
      put "/api/v1/entries/#{entry.id}", headers: { 'Authentication-Token': user.authenticity_token },
        params: params

      expect(response).to have_http_status(:ok)
    end

    it "can delete entry" do
      delete "/api/v1/entries/#{entry.id}", headers: { 'Authentication-Token': user.authenticity_token }

      expect(response).to have_http_status(:no_content)
      expect(Entry.count).to eql(0)
    end
  end
end
