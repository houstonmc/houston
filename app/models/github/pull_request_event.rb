module Github
  class PullRequestEvent
    attr_reader :action, :pull_request

    def self.process!(payload)
      self.new(payload).process!
    end

    # https://developer.github.com/v3/activity/events/types/#pullrequestevent
    def initialize(payload)
      @action = payload.fetch "action"
      @pull_request = payload.fetch "pull_request"
    end

    def process!
      Rails.logger.info "\e[34m[github] Processing Pull Request Event (action: #{action})\e[0m"

      # Ignore when pull requests are assigned
      if action == "assigned" || action == "unassigned"
        return
      end

      # Delete pull requests when they are closed
      if action == "closed"
        PullRequest.close! pull_request
        return
      end

      # Ensure that we have a record of this open pull request
      # action: labeled, unlabeled, opened, reopened, or synchronized
      pr = PullRequest.upsert! pull_request
      case action
      when "labeled" then pr.add_label! payload["label"]["name"]
      when "unlabeled" then pr.remove_label! payload["label"]["name"]
      end
    end

  end
end
