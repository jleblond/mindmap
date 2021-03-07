class IdeasController < ApplicationController
  before_action :set_canvas_and_diagram

  def index
    @ideas = Idea.where(canvas_id: @canvas)
    render json: @ideas
  end

  def create
    @idea = @canvas.ideas.build(idea_params)
    if @idea.save
      flash[:notice] = "Idea created!"
      redirect_to(edit_diagram_canvas_path(@diagram))
    else
      flash[:alert] = "Idea was not created"
      redirect_to(edit_diagram_path(@diagram))
    end
  end

  private

  def idea_params
    params.require(:idea).permit(:label, :description, :url, :shape_type, :x_pos, :y_pos, :diameter)
  end

  def set_canvas_and_diagram
    @diagram = Diagram.find_by_id(params[:diagram_id])
    @canvas = @diagram.try(:canvas)
  end


end
