describe 'the signin process', type: :feature do
  scenario 'user cannot sign in if not registered' do
    visit '/users/sign_in'
    within("#new_user") do
      fill_in 'Email', with: 'user@example.com'
      fill_in 'Password', with: 'password'
    end
    click_button 'Log in'
    expect(page).to have_content 'Invalid Email or password'
  end

  before :each do
    @user = FactoryBot.create(:user)
  end

  scenario 'user cannot sign in with wrong email' do
    visit '/users/sign_in'
    within("#new_user") do
      fill_in 'Email', with: 'user@wrong_email.com'
      fill_in 'Password', with: @user.password
    end
    click_button 'Log in'
    expect(page).to have_content 'Invalid Email or password'
  end

  scenario 'user cannot sign in with wrong password' do
    visit '/users/sign_in'
    within("#new_user") do
      fill_in 'Email', with: @user.email
      fill_in 'Password', with: 'invlad_password'
    end
    click_button 'Log in'
    expect(page).to have_content 'Invalid Email or password'
  end

  scenario 'user can sign in with valid credentials' do
    visit '/users/sign_in'
    within("#new_user") do
      fill_in 'Email', with: @user.email
      fill_in 'Password', with: @user.password
    end
    click_button 'Log in'
    expect(page).to have_content 'Signed in successfully'
  end
end
