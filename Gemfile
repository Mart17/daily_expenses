# frozen_string_literal: true

source 'https://rubygems.org'
git_source(:github) { |repo| "https://github.com/#{repo}.git" }

ruby '2.5.3'

gem 'bootsnap',     '>= 1.1.0', require: false
gem 'bootstrap',    '4.3.1'
gem 'coffee-rails', '~> 4.2'
gem 'devise'
gem 'jbuilder',     '~> 2.5'
gem 'jquery-rails', '>= 4.3.1'
gem 'nokogiri',     '1.10.4'
gem 'pg'
gem 'puma',         '~> 3.12'
gem 'rails',        '~> 5.2.3'
gem 'react-rails',  '2.5.0'
gem 'sass-rails',   '~> 5.0'
gem 'slim-rails'
gem 'tzinfo-data', platforms: %i[mingw mswin x64_mingw jruby]
gem 'uglifier',     '>= 1.3.0'
gem 'webpacker',    '4.0.7'

group :development do
  gem 'brakeman',              '4.6.1'
  gem 'bundler-audit',         '0.6.1'
  gem 'better_errors'
  gem 'foreman'
  gem 'letter_opener',         '>= 1.4.1'
  gem 'listen',                '>= 3.0.5', '< 3.2'
  gem 'rails_layout'
  gem 'spring'
  gem 'spring-commands-rspec'
  gem 'spring-watcher-listen', '~> 2.0.0'
  gem 'web-console',           '>= 3.3.0'
end

group :development, :test do
  gem 'byebug', platforms: %i[mri mingw x64_mingw]
  gem 'capybara',              '3.28.0'
  gem 'factory_bot_rails'
  gem 'faker'
  gem 'pry-rails'
  gem 'pry-rescue'
  gem 'rspec-rails'
  gem 'rspec_junit_formatter', '~> 0.2.3'
  gem 'rubocop', require: false
end

group :test do
  gem 'database_cleaner'
end
