require 'rails_helper'

describe 'the signin process', type: :feature do
  let (:user) { create(:user, confirmation_token: nil,
                                         confirmed_at: nil,
                                         confirmation_sent_at: nil) }
  let (:confirmed_user) { create (:user) }

  scenario 'user cannot sign in if not registered' do
    visit '/users/sign_in'
    within("#new_user") do
      fill_in 'Email', with: 'user@example.com'
      fill_in 'Password', with: 'password'
    end
    click_button 'Sign in'
    expect(page).to have_content 'Invalid Email or password'
  end

  scenario 'user cannot sign in with wrong email' do
    visit '/users/sign_in'
    within("#new_user") do
      fill_in 'Email', with: 'user@wrong_email.com'
      fill_in 'Password', with: user.password
    end
    click_button 'Sign in'
    expect(page).to have_content 'Invalid Email or password'
  end

  scenario 'user cannot sign in with wrong password' do
    visit '/users/sign_in'
    within("#new_user") do
      fill_in 'Email', with: user.email
      fill_in 'Password', with: 'invalid_password'
    end
    click_button 'Sign in'
    expect(page).to have_content 'Invalid Email or password'
  end

  scenario 'user cannot sign in with unconfirmed account' do
    visit '/users/sign_in'
    within("#new_user") do
      fill_in 'Email', with: user.email
      fill_in 'Password', with: user.password
    end
    click_button 'Sign in'
    expect(page).to have_content 'You have to confirm your email address before continuing'
  end

  scenario 'user can sign in with valid credentials and confirmed account' do
    visit '/users/sign_in'
    within("#new_user") do
      fill_in 'Email', with: confirmed_user.email
      fill_in 'Password', with: confirmed_user.password
    end
    click_button 'Sign in'
    expect(page).to have_content 'Signed in successfully'
  end
end
