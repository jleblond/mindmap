# == Schema Information
#
# Table name: diagrams
#
#  id          :integer          not null, primary key
#  name        :string           not null
#  description :text
#  user_id     :integer          not null
#  created_at  :datetime         not null
#  updated_at  :datetime         not null
#
require "test_helper"

class DiagramTest < ActiveSupport::TestCase
  # test "the truth" do
  #   assert true
  # end
end
