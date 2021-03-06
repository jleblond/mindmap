class ApplicationController < ActionController::Base
  require 'pry'

  protected

  def require_edit_permission
    diagram = Diagram.find_by_id(params[:id])
    return current_user.id == diagram.try(:user_id) ? true : false
  end

end
