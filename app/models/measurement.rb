class Measurement < ActiveRecord::Base
  
  belongs_to :subject, polymorphic: true
  
  validates :name, :value, :taken_at, presence: true
  
  default_scope -> { order(arel_table[:taken_at].desc) }
  
  class << self
    def take!(attributes)
      identifying_attributes = attributes.pick(:subject_type, :subject_id, :taken_at, :name)
      subject = attributes[:subject]
      identifying_attributes.merge!(subject_type: subject.class.name, subject_id: subject.id) if subject
      find_or_initialize_by(identifying_attributes).tap do |measurement|
        measurement.value = attributes[:value]
        measurement.save!
      end
    end
    
    def taken_at(time)
      where(taken_at: time)
    end
    
    def taken_on(date)
      where(taken_on: date)
    end
    
    def taken_before(date)
      where(arel_table[:taken_on].lteq(date))
    end
    
    def taken_after(date)
      where(arel_table[:taken_on].gteq(date))
    end
    
    def for(subject)
      where(subject_type: subject.class.name, subject_id: subject.id)
    end
    
    # Valid identifies for names
    #  - weekly.hours.charged
    #  - weekly.hours.charged.*
    #  - weekly.hours.charged.{fix,chore}
    #  - weekly.hours.{worked,charged}.fix
    # Invalid arguments
    #  - weekly.hours.*.fix
    def named(*name_patterns)
      name_patterns =  name_patterns.flatten.map { |pattern| pattern
        .gsub(/\{([\w,]+)\}/) { "(#{$~.captures[0].gsub(/,/, "|")})" }
        .gsub(/\.\*$/, "%") }
      where(["name SIMILAR TO ?", "(#{name_patterns.join("|")})"])
    end
    
    def total
      pluck(:value).inject(0) { |sum, value| sum + value.to_d }
    end
    
    def mean
      denominator = count
      return nil if denominator.zero?
      total.to_f / denominator
    end
    
    def debug
      format_subject = ->(s) { s.is_a?(User) ? s.first_name : s.is_a?(Project) ? s.slug : "" }
      puts includes(:subject).reorder("taken_at ASC, subject_type ASC, subject_id ASC, name ASC").map { |m|
        line = [ m.taken_on.strftime("%-m/%-d").rjust(5),
                 m.taken_at.strftime("%H:%M:%S"),
                 format_subject[m.subject].ljust(9),
                 m.name.ljust(40),
                 m.value.rjust(8) ].join(" ")
        line = "\e[36m#{line}\e[0m" if m.subject_type == "User"
        line = "\e[35m#{line}\e[0m" if m.subject_type == "Project"
        line }
    end
  end
  
  def taken_at=(value)
    super
    self.taken_on = value && value.to_date
  end
  
end
