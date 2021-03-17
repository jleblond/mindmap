# == Schema Information
#
# Table name: ideas
#
#  id               :bigint           not null, primary key
#  label            :string
#  background_color :string
#  text_color       :string
#  description      :text
#  canvas_id        :integer
#  url              :string
#  shape_type       :string
#  x_pos            :integer
#  y_pos            :integer
#  width            :float
#  height           :float
#  created_at       :datetime         not null
#  updated_at       :datetime         not null
#
class Idea < ApplicationRecord
  belongs_to :canvas, class_name: 'Canvas', foreign_key: 'canvas_id'
  has_one_attached :media
end
