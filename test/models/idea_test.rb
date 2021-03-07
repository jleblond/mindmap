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
require "test_helper"

class IdeaTest < ActiveSupport::TestCase
  # test "the truth" do
  #   assert true
  # end
end
