class IdeasController < ApplicationController
  def index
    @ideas = Idea.all
    render json: @ideas
  end

  def create
    diagram = Diagram.find_by_id(params[:diagram_id])
    @canvas = diagram.canvas

    @idea = @canvas.ideas.build(idea_params)
    if @idea.save
      flash[:notice] = "Idea created!"
      redirect_to(edit_diagram_canvas_path(diagram))
    else
      flash[:alert] = "Idea was not created"
      redirect_to(edit_diagram_path(diagram))
    end
  end

  private

  def idea_params
    params.require(:idea).permit(:label, :description, :url, :shape_type, :x_pos, :y_pos, :diameter)
  end


end
