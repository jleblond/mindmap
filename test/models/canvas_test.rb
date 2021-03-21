# == Schema Information
#
# Table name: canvas
#
#  id         :bigint           not null, primary key
#  diagram_id :integer
#  image_url  :string
#  created_at :datetime         not null
#  updated_at :datetime         not null
#
require "test_helper"

class CanvasTest < ActiveSupport::TestCase
  # test "the truth" do
  #   assert true
  # end
end
