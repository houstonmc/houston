require "test_helper"
require "support/houston/adapters/version_control/mock_adapter"
require "support/houston/adapters/ticket_tracker/mock_adapter"
require "support/houston/adapters/ci_server/mock_adapter"


class ProjectTest < ActiveSupport::TestCase
  attr_reader :project


  context "Validation:" do
    should "validate version control parameters when a version control adapter is specified" do
      project = Project.new(version_control_name: "Git", extended_attributes: {"git_location" => "/wrong/path"})
      project.valid?
      assert project.errors[:git_location].any?
    end

    should "not validate version control parameters if no adapter is specified" do
      project = Project.new(version_control_name: "None", extended_attributes: {"git_location" => "/wrong/path"})
      project.valid?
      refute project.errors[:git_location].any?
    end
  end


  context "Adapters:" do
    should "find the specified built-in version control adapter" do
      project = Project.new(version_control_name: "None")
      assert_equal Houston::Adapters::VersionControl::NoneAdapter, project.version_control_adapter
    end

    should "find the specified built-in ticket tracking adapter" do
      project = Project.new(ticket_tracker_name: "None")
      assert_equal Houston::Adapters::TicketTracker::NoneAdapter, project.ticket_tracker_adapter
    end

    should "find the specified built-in CIServer adapter" do
      project = Project.new(ci_server_name: "None")
      assert_equal Houston::Adapters::CIServer::NoneAdapter, project.ci_server_adapter
    end

    should "find the specified extension version control adapter" do
      project = Project.new(version_control_name: "Mock")
      assert_equal Houston::Adapters::VersionControl::MockAdapter, project.version_control_adapter
    end

    should "find the specified extension ticket tracking adapter" do
      project = Project.new(ticket_tracker_name: "Mock")
      assert_equal Houston::Adapters::TicketTracker::MockAdapter, project.ticket_tracker_adapter
    end

    should "find the specified extension CIServer adapter" do
      project = Project.new(ci_server_name: "Mock")
      assert_equal Houston::Adapters::CIServer::MockAdapter, project.ci_server_adapter
    end
  end


  context "A project's bare repo," do
    setup do
      system "rm -rf #{Rails.root}/tmp/test-01.git"
      system "cp -r #{Rails.root}/test/data/bare_repo.git #{Rails.root}/tmp/test-01.git"
      @project = Project.create!(
        name: "Test",
        slug: "test-01",
        version_control_name: "Git",
        extended_attributes:  {"git_location" => "git@github.com:houston/fixture.git"})
    end

    teardown do
      system "rm -rf #{Rails.root}/tmp/test-*.git"
    end

    context "when the project's slug is changed," do
      should "be moved" do
        project.update_attributes slug: "test-02"
        test01_exists = File.exists?("#{Rails.root}/tmp/test-01.git")
        test02_exists = File.exists?("#{Rails.root}/tmp/test-02.git")

        problems = []
        problems << "tmp/test-01.git still exists" if test01_exists
        problems << "tmp/test-02.git does not exist" unless test02_exists

        assert problems.none?, "Expected tmp/test-01.git to have been renamed " <<
          "to test-02.git, but #{problems.join(" and ")}"
      end
    end
  end


end
