class ApplicationController < ActionController::Base
  require 'pry'

  protected

  def require_edit_permission
    case params[:controller]
    when "diagrams"
      diagram_id = params[:id]
    else
      diagram_id = params[:diagram_id]
    end
    diagram = Diagram.find_by_id(diagram_id)
    is_authorized = (current_user.id == diagram.try(:user_id)) ? true : false
    unless is_authorized
      flash[:alert] = "You are not authorized to do this action"
      return redirect_to root_path
    end
  end

end
