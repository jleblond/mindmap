class DiagramsController < ApplicationController
  before_action :authenticate_user!
  before_action :require_edit_permission, only: [:edit, :update, :destroy]

  layout "application"

  def index
    @diagrams = current_user.diagrams
  end

  def new
    @diagram = current_user.diagrams.new
  end

  def create
    @diagram = current_user.diagrams.build(diagram_params)
    @canvas = @diagram.build_canvas
    if @diagram.save && @canvas.save
      flash[:notice] = "Diagram created!"
      redirect_to(edit_diagram_path(id: @diagram.id))
    else
      flash[:alert] = "Diagram was not created"
      redirect_to(new_diagram_path)
    end
  end

  def edit
    @diagram = current_user.diagrams.find_by_id(params[:id])
  end

  def update
    @diagram = current_user.diagrams.find_by_id(params[:id])
    @diagram.update(diagram_params)
    return redirect_to diagrams_path
  end

  def destroy
    @diagram = current_user.diagrams.find_by_id(params[:id])
    @diagram.destroy
    return redirect_to diagrams_path
  end

  private

  def diagram_params
    params.require(:diagram).permit(:name, :description, :user_id)
  end
end
