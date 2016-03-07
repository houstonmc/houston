# coding: utf-8
lib = File.expand_path("../lib", __FILE__)
$LOAD_PATH.unshift(lib) unless $LOAD_PATH.include?(lib)
require "houston/version"

Gem::Specification.new do |spec|
  spec.name          = "houston-core"
  spec.version       = Houston::VERSION
  spec.authors       = ["Bob Lail"]
  spec.email         = ["bob.lailfamily@gmail.com"]

  spec.summary       = %q{Mission Control for your projects and teams}
  spec.homepage      = "https://github.com/houston/houston"

  spec.files         = `git ls-files -z`.split("\x0")
  spec.executables   = ["houston"]
  spec.test_files    = spec.files.grep(%r{^(test|spec|features)/})
  spec.require_paths = ["lib"]



  # For Houston as a Web Application
  spec.add_dependency "rails", "~> 4.2.5.1"
  spec.add_dependency "pg", "~> 0.18.3"
  # --------------------------------
  spec.add_dependency "activerecord-import"
  spec.add_dependency "activerecord-pluck_in_batches"
  spec.add_dependency "addressable"
  spec.add_dependency "browser", "~> 1.1.0"
  spec.add_dependency "cancan", "~> 1.6.10"
  spec.add_dependency "default_value_for", "3.0.1"
  spec.add_dependency "devise", "~> 3.5.0"
  spec.add_dependency "devise_invitable", "~> 1.5.3"
  spec.add_dependency "houston-devise_ldap_authenticatable"
  spec.add_dependency "faraday", "~> 0.9.2"
  spec.add_dependency "faraday-http-cache", "~> 1.2.2"
  spec.add_dependency "faraday-raise-errors", "~> 0.2.0"
  spec.add_dependency "gemoji", "~> 2.1.0"
  spec.add_dependency "handlebars_assets", "~> 0.21.0" 
  spec.add_dependency "hpricot", "~> 0.8.6"
  spec.add_dependency "neat-rails"
  spec.add_dependency "nokogiri"
  spec.add_dependency "houston-oauth-plugin"
  spec.add_dependency "oj", "~> 2.13"
  spec.add_dependency "openxml-xlsx", ">= 0.2.0"
  spec.add_dependency "pg_search", "~> 1.0.5"
  spec.add_dependency "premailer", "~> 1.8.6"
  spec.add_dependency "progressbar" # for long migrations
  spec.add_dependency "rack-utf8_sanitizer", "~> 1.3.1"
  spec.add_dependency "redcarpet", "~> 3.3.2"
  spec.add_dependency "strongbox", "~> 0.7.2" # for encrypting user credentials
  spec.add_dependency "thor"
  spec.add_dependency "thread_safe", "~> 0.3.5"
  spec.add_dependency "houston-vestal_versions"

  # The Asset Pipeline
  spec.add_dependency "sass-rails", "~> 5.0"
  spec.add_dependency "uglifier", ">= 2.7.2"
  spec.add_dependency "coffee-rails", "~> 4.1.0"

  # Houston's background jobs daemon
  spec.add_dependency "rufus-scheduler", "~> 3.1.7"
  spec.add_dependency "whenever", "0.9.2" # Houston uses just the DSL for writing cron jobs

  # Used to create image charts for embedding in email
  # TODO: this product is deprecated, so find a replacement
  spec.add_dependency "googlecharts", "~> 1.6.12"

  # Used to edit a releases' changes and a project's followers
  spec.add_dependency "nested_editor_for"

  # Bundler is a runtime dependency because it used to parse Gemfiles
  spec.add_dependency "bundler"

  # This is a runtime dependency because Houston uses it to publish
  # code coverage to Code Climate. The version is locked because
  # Houston implements its API.
  spec.add_dependency "codeclimate-test-reporter", "0.4.8"

  # This is a runtime dependency because Houston uses it to parse
  # code coverage data generated by simplecov
  spec.add_dependency "simplecov", "~> 0.9.1"

  # Implements Houston's VersionControl::GitAdapter
  spec.add_dependency "rugged", "~> 0.23.3" # for speaking to Git

  # For integration with GitHub
  spec.add_dependency "octokit", "~> 4.1.0"

  # Implements Houston's TicketTracker::UnfuddleAdapter
  spec.add_dependency "boblail-unfuddle"

  # For deploying to EngineYard
  spec.add_dependency "engineyard", "~> 3.2.1"

end
