require 'resque/server'

Houston::Application.routes.draw do
  
  devise_for :users, :controllers => { :sessions => "sessions" }
  
  root :to => "kanban#index", :via => :get
  
  
  
  # Dashboard
  
  match "dashboard" => "dashboard#index", :via => :get, :as => :dashboard
  match "dasbhoard/:slug" => "project_dashboard#index", :via => :get, :as => :project_dashboard
  
  
  
  # Kanban
  
  match "kanban/:slug" => "project_kanban#index", :via => :get, :as => :project_kanban
  
  constraints :queue => Regexp.new(KanbanQueue.slugs.join("|")) do
    match "kanban/:slug/:queue" => "project_kanban#queue", :via => :get, :as => :project_kanban_queue
  end
  
  
  
  # Testing Report
  
  match "testing_report" => "testing_report#index", :via => :get, :as => :testing_report
  match "testing_report/:slug" => "testing_report#show", :via => :get, :as => :project_testing_report
  
  match "tickets/:id", :to => "tickets#show", :via => :get
  match "tickets/:id", :to => "tickets#update", :via => :put
  match "tickets/:id", :to => "tickets#close", :via => :delete
  
  scope "tickets/:ticket_id" do
    resources :testing_notes
  end
  
  
  
  # Weekly Report
  
  match "weekly_report", :to => "weekly_report#show"
  match "weekly_report/:year/:month/:day", :to => "weekly_report#show", :as => :weekly_report
  match "weekly_report/email", :to => "weekly_report#send_email", :via => :post
  match "weekly_report/:year/:month/:day/email", :to => "weekly_report#prepare_email", :as => :send_weekly_report, :via => :get
  match "weekly_report/:year/:month/:day/email", :to => "weekly_report#send_email", :as => :send_weekly_report, :via => :post
  
  
  
  # Projects
  
  resources :projects do
    member do
      put :retire
    end
    
    match "deploy", :to => "deploys#create", :via => :post
    match "deploy", :to => "deploys#create", :via => :get if Rails.env.development?
  end
  
  
  
  # Releases
  
  scope "projects/:project_id" do
    match "releases", :to => "releases#index"
    scope "environments/:environment" do
      resources :releases
    end
  end
  
  
  
  # Teammates
  
  constraints :id => /\d+/ do
    resources :users do
      member do
        post :invite
      end
    end
  end
  
  
  
  # Modules
  
  Houston.config.modules.each do |mod|
    mount mod.engine => mod.path
  end
  
  
  
  # Other
  
  # Experiment
  match "tickets", :to => "tickets#index", :via => :get
  
  # Resque
  mount Resque::Server.new, :at => "/resque"
  
  # This just renders a fake Kanban:
  # to give you an idea of what your queues, colors, and ages will look like
  match "demo", :to => "demo#index", :via => :get
  
end
