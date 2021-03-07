# == Schema Information
#
# Table name: ideas
#
#  id          :integer          not null, primary key
#  label       :string
#  description :text
#  canvas_id   :integer
#  url         :string
#  shape_type  :string
#  x_pos       :integer
#  y_pos       :integer
#  diameter    :float
#  created_at  :datetime         not null
#  updated_at  :datetime         not null
#
class Idea < ApplicationRecord
  belongs_to :canvas, class_name: 'Canvas', foreign_key: 'canvas_id'
  has_one_attached :media
end
