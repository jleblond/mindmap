# == Schema Information
#
# Table name: canvas
#
#  id         :integer          not null, primary key
#  diagram_id :integer
#  created_at :datetime         not null
#  updated_at :datetime         not null
#
class Canvas < ApplicationRecord
  belongs_to :diagram, class_name: 'Diagram', foreign_key: 'diagram_id'
  has_many :ideas
  has_one_attached :background

  validates :diagram_id, presence: true


  def has_background?
    self.background.attached?
  end
end
