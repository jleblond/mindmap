class IdeasController < ApplicationController
  before_action :set_canvas_and_diagram
  skip_before_action :verify_authenticity_token

  layout "canvas"

  def index
    @ideas = Idea.where(canvas_id: @canvas)
    render json: @ideas
  end


  def create
    @idea = @canvas.ideas.build(idea_params)
    if @idea.save
      respond_to do |format|
        format.json { render json: @idea }
        format.html {
          flash[:notice] = "Idea created!"
          redirect_to(draw_diagram_canvas_path(@diagram))
        }
      end
    else
      respond_to do |format|
        format.json
        format.html {
          flash[:alert] = "Idea was not created"
          redirect_to(edit_diagram_path(@diagram))
        }
      end
    end
  end

  def edit
    @idea = Idea.find_by_id(params[:id])
    respond_to do |format|
      format.js
      format.html
    end
  end

  def update
    @idea = Idea.find_by_id(params[:id])
    @idea.update(idea_params)
    redirect_to(draw_diagram_canvas_path(@diagram))
  end

  def update_position
    idea = Idea.find_by_id(params[:id])
    idea.x_pos = params[:idea][:x_pos]
    idea.y_pos = params[:idea][:y_pos]
    idea.save
  end

  def destroy
    @idea = Idea.find_by_id(params[:id])
    @idea.destroy!
    redirect_to(draw_diagram_canvas_path(@diagram))
  end

  private

  def idea_params
    params.require(:idea).permit!
  end

  def set_canvas_and_diagram
    @diagram = Diagram.find_by_id(params[:diagram_id])
    @canvas = @diagram.try(:canvas)
  end


end
