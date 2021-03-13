module CanvasHelper

  def canvas_actions_list(controller_params)
    if controller_params[:controller] == "canvas"
      case controller_params[:action]
      when "edit"
        return [:show]
      when "show"
        return [:edit]
      end
    elsif controller_params[:controller] == "diagrams" && controller_params[:action] == "edit"
      diagram = Diagram.find_by_id(params[:id])
      return (diagram.canvas ? [:show, :edit, :delete] : [:new])
    end
    return []
  end
end
