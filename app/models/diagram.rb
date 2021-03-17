# == Schema Information
#
# Table name: diagrams
#
#  id          :bigint           not null, primary key
#  name        :string           not null
#  description :text
#  user_id     :integer          not null
#  created_at  :datetime         not null
#  updated_at  :datetime         not null
#
class Diagram < ApplicationRecord
  # has_paper_trail
  # acts_as_paranoid

  belongs_to :user, class_name: 'User', foreign_key: 'user_id'
  has_one :canvas

  validates :name, presence: true, length: {maximum: 50}
  validates :user_id, presence: true


end
