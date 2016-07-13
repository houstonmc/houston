root = File.expand_path(File.join(File.dirname(__FILE__), "../../.."))
require File.join(root, "lib/core_ext/hash")
require File.join(root, "lib/core_ext/kernel")
require File.join(root, "lib/core_ext/exception")
require File.join(root, "lib/houston/boot/triggers")
require File.join(root, "lib/houston/boot/observer")
require File.join(root, "lib/houston/boot/actions")
require File.join(root, "lib/houston/boot/timer")

$:.unshift File.expand_path(File.join(root, "app/adapters"))
require "houston/adapters"

module Houston
  class Configuration
    attr_reader :observer, :actions, :timer

    def initialize
      @root = Rails.root
      @modules = []
      @gems = []
      @ticket_types = {}
      @authentication_strategy = :database
      @authentication_strategy_configuration = {}
      @ticket_tracker_configuration = {}
      @ci_server_configuration = {}
      @error_tracker_configuration = {}
    end

    def triggers
      return @triggers if defined?(@triggers)
      @triggers = Houston::Triggers.new(self)
    end

    def observer
      return @observer if defined?(@observer)
      @observer = Houston::Observer.new
    end

    def actions
      return @actions if defined?(@actions)
      @actions = Houston::Actions.new
    end

    def timer
      return @timer if defined?(@timer)
      @timer = Houston::Timer.new
    end




    # Global configuration

    def root(*args)
      return @root if args.none?
      @root = args.first

      # Keep structure.sql in instances' db directory
      ActiveRecord::Tasks::DatabaseTasks.db_dir = root.join("db")

      # Configure Houston
      Houston::Application.paths["config/database"] = root.join("config/database.yml")
      Houston::Application.paths["public"] = root.join("public")
      Houston::Application.paths["log"] = root.join("log/#{Rails.env}.log")
      Houston::Application.paths["tmp"] = root.join("tmp")
      Houston::Application.paths["config/environments"] << root.join("config/environments")
    end

    def title(*args)
      @title = args.first if args.any?
      @title ||= "Houston"
    end

    def host(*args)
      @host = args.first if args.any?
      @host ||= nil
    end

    def time_zone(*args)
      return Rails.application.config.time_zone if args.none?
      Rails.application.config.time_zone = args.first
      Time.zone = args.first
    end

    def mailer_sender(*args)
      if args.any?
        @mailer_sender = args.first
        (Rails.application.config.action_mailer.default_options ||= {}).merge!(from: @mailer_sender)
      end
      @mailer_sender ||= nil
    end

    def mailer_from
      require "mail"

      Mail::Address.new.tap do |email|
        email.display_name = title
        email.address = mailer_sender
      end.to_s
    end

    def passphrase(*args)
      @passphrase = args.first if args.any?
      @passphrase ||= nil
    end

    def keypair
      root.join("config", "keypair.pem")
    end

    def parallelization(*args)
      @parallelization = args.first if args.any?
      @parallelization ||= :off
    end

    def parallelize?
      parallelization == :on
    end

    def smtp(&block)
      Rails.application.config.action_mailer.smtp_settings = HashDsl.hash_from_block(block) if block_given?
      Rails.application.config.action_mailer.smtp_settings
    end

    def s3(&block)
      @s3 = HashDsl.hash_from_block(block) if block_given?
      @s3 ||= {}
    end

    def engineyard(&block)
      @engineyard = HashDsl.hash_from_block(block) if block_given?
      @engineyard ||= {}
    end

    def project_categories(*args)
      @project_categories = args if args.any?
      @project_categories ||= []
    end

    def navigation(*args)
      @navigation = args if args.any?
      @navigation ||= []
    end

    def project_features(*args)
      @project_features = args if args.any?
      return Houston.available_project_features unless @project_features
      @project_features & Houston.available_project_features
    end



    def project_colors(*args)
      new_hash = Hash.new(ColorValue.new("505050"))
      @project_colors = args.first.each_with_object(new_hash) { |(key, hex), hash| hash[key] = ColorValue.new(hex) } if args.any?
      @project_colors ||= new_hash
    end

    def environments(*args)
      @environments = args if args.any?
      @environments ||= []
    end

    def roles(*args)
      @roles = args if args.any?
      ["Guest"] + (@roles ||= [])
    end

    def default_role
      "Guest"
    end

    def project_roles(*args)
      @project_roles = args if args.any?
      ["Follower"] + (@project_roles ||= [])
    end

    def ticket_types(*args)
      if args.any?
        @ticket_types = args.first
        @ticket_types.default = "EFEFEF"
      end
      @ticket_types.keys
    end

    def ticket_colors
      @ticket_types
    end





    def parse_ticket_description(ticket=nil, &block)
      if block_given?
        @parse_ticket_description_proc = block
      elsif ticket
        @parse_ticket_description_proc.call(ticket) if @parse_ticket_description_proc
      end
    end

    def identify_committers(commit=nil, &block)
      if block_given?
        @identify_committers_proc = block
      elsif commit
        @identify_committers_proc ? Array(@identify_committers_proc.call(commit)) : [commit.committer_email]
      end
    end





    # Authentication options

    def authentication_strategy(strategy=nil, &block)
      @authentication_strategy = strategy if strategy
      @authentication_strategy_configuration = HashDsl.hash_from_block(block) if block_given?

      @authentication_strategy
    end
    attr_reader :authentication_strategy_configuration

    def devise_configuration
      # Include default devise modules. Others available are:
      #      :registerable,
      #      :encryptable,
      #      :confirmable,
      #      :lockable,
      #      :timeoutable,
      #      :omniauthable

      configuration = [:database_authenticatable]
      unless Rails.env.test? # <-- !todo: control when custom strategies are employed in the test suite
        configuration << :ldap_authenticatable if authentication_strategy == :ldap
      end
      configuration.concat [
       :recoverable,
       :rememberable,
       :trackable,
       :validatable,
       :invitable ]
    end





    # Permissions

    def abilities(&block)
      @abilities_block = block
    end

    def defines_abilities?
      @abilities_block.present?
    end

    def configure_abilities(context, user)
      context.instance_exec(user, &@abilities_block)
    end





    # Adapters

    Houston::Adapters.each do |name, path|
      module_eval <<-RUBY
        def #{path}(adapter, &block)
          raise ArgumentError, "\#{adapter.inspect} is not a #{name}: known #{name} adapters are: \#{Houston::Adapters::#{name}.adapters.map { |name| ":\#{name.downcase}" }.join(", ")}" unless Houston::Adapters::#{name}.adapter?(adapter)
          raise ArgumentError, "#{path} should be invoked with a block" unless block_given?

          configuration = HashDsl.hash_from_block(block)

          @#{path}_configuration ||= {}
          @#{path}_configuration[adapter] = configuration
        end

        def #{path}_configuration(adapter)
          raise ArgumentError, "\#{adapter.inspect} is not a #{name}: known #{name} adapters are: \#{Houston::Adapters::#{name}.adapters.map { |name| ":\#{name.downcase}" }.join(", ")}"  unless Houston::Adapters::#{name}.adapter?(adapter)

          @#{path}_configuration ||= {}
          @#{path}_configuration[adapter] || {}
        end
      RUBY
    end

    def github(&block)
      @github_configuration = HashDsl.hash_from_block(block) if block_given?
      @github_configuration ||= {}
    end

    def supports_pull_requests?
      github[:organization].present?
    end





    # Modules

    def use(module_name, args={}, &block)
      @modules << ::Houston::Module.new(module_name, args, &block)
    end
    attr_reader :modules

    def uses?(module_name)
      module_name = module_name.to_s
      modules.any? { |mod| mod.name == module_name }
    end

    def module(module_name)
      module_name = module_name.to_s
      modules.detect { |mod| mod.name == module_name }
    end





    # Configuration for Releases

    def change_tags(*args)
      if args.any?
        @tag_map = {}
        args.flatten.each_with_index do |hash, position|
          Tag.new(hash.pick(:name, :color).merge(slug: hash[:as], position: position)).tap do |tag|
            @tag_map[tag.slug] = tag
            hash.fetch(:aliases, []).each do |slug|
              @tag_map[slug] = tag
            end
          end
        end
      end
      (@tag_map ||= {}).values.uniq
    end

    def fetch_tag(slug)
      tag_map.fetch(slug, NullTag.instance)
    end

    attr_reader :tag_map





    #

    def key_dependencies(&block)
      if block_given?
        dependencies = Houston::Dependencies.new
        dependencies.instance_eval(&block)
        @dependencies = dependencies.values
      end
      @dependencies || []
    end





    # Actions and Triggers

    def action(name, &block)
      raise ArgumentError, "A block is required to define an action" unless block_given?
      actions.define(name, &block)
    end

    def on(event, &block)
      observer.on(event, &block)
    end

    def at(*args, &block)
      time, action_name = extract_trigger_and_action!(args)

      # Passing options to Houston.config.at is deprecated
      # -------------------------------------------------------------- #
      if args.first.is_a?(Hash)
        options = args.first
        if days_of_the_week = options.delete(:every)
          puts "DEPRECATED: Instead of passing every: #{days_of_the_week.inspect} to Houston.config.at, use Houston.config.at [#{days_of_the_week.inspect}, #{time}], ..."
          time = [days_of_the_week, time]
        end
        options.keys.each do |key|
          puts "DEPRECATED: #{key.inspect} is an unknown option for Houston.config.at. In the next version of houston-core, Houston.config.at will no longer accept options"
        end
      end
      # -------------------------------------------------------------- #

      action action_name, &block
      triggers.at time, action_name
    end

    def every(*args, &block)
      interval, action_name = extract_trigger_and_action!(args)

      # Passing options to Houston.config.every is deprecated
      # -------------------------------------------------------------- #
      if args.first.is_a?(Hash)
        options = args.first
        options.keys.each do |key|
          puts "DEPRECATED: #{key.inspect} is an unknown option for Houston.config.at. In the next version of houston-core, Houston.config.at will no longer accept options"
        end
      end
      # -------------------------------------------------------------- #

      action action_name, &block
      triggers.every interval, action_name
    end

    private def extract_trigger_and_action!(args)
      if args.first.is_a?(Hash)
        return args.shift.to_a[0] if args.first.one?
        raise ArgumentError, "Unrecognized trigger: #{args.inspect}"
      end
      return args.shift(2) if args.length >= 2
      raise NotImplementedError, "I haven't been programmed to extract trigger and action_name from #{args.inspect}"
    end





    def load(glob)
      __file__ = caller[0].split(":")[0]
      glob << ".rb" unless glob.end_with? ".rb"
      Dir.glob("#{File.dirname(__file__)}/#{glob}").each do |file|
        next if File.directory?(file)
        require file
      end
    end



    # Validation

    def validate!
      raise MissingConfiguration, <<-ERROR unless mailer_sender

        Houston requires a default email address to be supplied for mailers
        You can set the address by adding the following line to config/config.rb:

          mailer_sender "houston@my-company.com"

        ERROR
    end

    def method_missing(name, *args, &block)
      puts "\e[31mMissing Configuration option: \e[1m#{name}\e[0;90m\n#{caller[0]}\e[0m\n\n"
      nil
    end

  end



  class Module
    attr_reader :name

    def initialize(module_name, options={}, &moduleconfig)
      @name = module_name.to_s

      if namespace.respond_to?(:config) && block_given?
        namespace.config(&moduleconfig)
      elsif block_given? && !namespace.respond_to?(:config)
        raise "#{name} does not accept configuration"
      end
    end

    def engine
      namespace::Engine
    end

    def path
      "/#{name}"
    end

    def namespace
      @namespace ||= "houston/#{name}".camelize.constantize
    end
  end



  class Dependencies
    attr_reader :values

    def initialize
      @values = []
    end

    def gem(slug, target_versions=[], options={})
      @values << options.merge(type: :gem, slug: slug, target_versions: target_versions)
    end
  end



  class HashDsl
    attr_reader :hash
    alias :to_hash :hash
    alias :to_h :hash

    def initialize
      @hash = {}
    end

    def self.from_block(block)
      HashDsl.new.tap { |dsl| dsl.instance_eval(&block) }
    end

    def self.hash_from_block(block)
      from_block(block).to_hash
    end

    def method_missing(method_name, *args, &block)
      if block_given?
        @hash[method_name] = HashDsl.hash_from_block(block)
      elsif args.length == 1
        @hash[method_name] = args.first
      else
        super
      end
    end
  end







  class ColorValue
    attr_reader :hex

    def initialize(hex)
      @hex = hex
    end

    def to_s
      @hex
    end

    def rgb
      "rgb(#{@hex.scan(/../).map { |s| s.to_i(16) }.join(", ")})"
    end

  end





  class NotConfigured < RuntimeError
    def initialize(message = "Houston has not been configured. Please load config/config.rb before calling Houston.config")
      super
    end
  end

  class MissingConfiguration < RuntimeError; end



module_function
  def config(&block)
    @configuration ||= Configuration.new
    if block_given?
      @configuration.instance_eval(&block)
      @configuration.validate!
    end
    @configuration
  end

  def triggers
    config.triggers
  end

  def observer
    config.observer
  end

  def actions
    config.actions
  end

  def timer
    config.timer
  end

  def root
    config.root
  end

  def github
    @github ||= Octokit::Client.new(access_token: config.github[:access_token], auto_paginate: true)
  end

end



class Tag

  def initialize(options={})
    @name = options[:name]
    @slug = options[:slug]
    @color = options[:color]
    @position = options[:position]
  end

  attr_reader :name
  attr_reader :slug
  attr_reader :color
  attr_reader :position

  def to_partial_path
    "tags/tag"
  end

end

class NullTag

  def self.instance
    @instance ||= self.new
  end

  def nil?
    true
  end

  def slug
    nil
  end

  def color
    "CCCCCC"
  end

  def name
    "No tag"
  end

  def position
    999
  end

end