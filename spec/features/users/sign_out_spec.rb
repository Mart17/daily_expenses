require 'rails_helper'

feature 'Sign out', :devise do
  let(:user) { create (:user) }

  scenario 'user signs out successfully' do
    visit '/users/sign_in'
    within("#new_user") do
      fill_in 'Email', with: user.email
      fill_in 'Password', with: user.password
    end
    click_button 'Log in'
    expect(page).to have_content I18n.t 'devise.sessions.signed_in'

    click_link 'Log out'
    expect(page).to have_content I18n.t 'devise.sessions.signed_out'
  end
end
