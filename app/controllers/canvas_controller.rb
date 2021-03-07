class CanvasController < ApplicationController
  before_action :authenticate_user!
  before_action :require_edit_permission, only: [:edit, :update, :destroy]
  before_action :set_diagram

  def index
    @canvases = Canvas.all
  end

  def new
    @canvas = @diagram.build_canvas
  end

  def create
    @canvas = @diagram.build_canvas(canvas_params)
    if @canvas.save
      flash[:notice] = "Canvas created!"
      redirect_to(edit_diagram_canvas_path(@diagram))
    else
      flash[:alert] = "Canvas was not created"
      redirect_to(edit_diagram_path(@diagram))
    end
  end

  def edit
    @canvas = @diagram.canvas
  end

  def destroy
    @canvas = @diagram.canvas
    @canvas.destroy
    return redirect_to edit_diagram_path(@diagram)
  end

  private

  def set_diagram
    @diagram = Diagram.find_by_id(params[:diagram_id])
  end

  def canvas_params
    params.require(:canvas).permit(:diagram_id, :background)
  end
end
