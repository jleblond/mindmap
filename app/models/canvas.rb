class Canvas < ApplicationRecord
  belongs_to :diagram, class_name: 'Diagram', foreign_key: 'diagram_id'
  has_one_attached :background

  validates :diagram_id, presence: true


  def has_background?
    self.background.attached?
  end
end
