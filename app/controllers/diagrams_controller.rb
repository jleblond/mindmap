class DiagramsController < ApplicationController
  before_action :authenticate_user!
  before_action :require_edit_permission, only: [:edit, :update]

  def index
    @diagrams = Diagram.all
  end

  def new
    @diagram = current_user.diagrams.new
  end

  def create
    @diagram = current_user.diagrams.build(diagram_params)
    if @diagram.save
      flash[:notice] = "Diagram created!"
      redirect_to(edit_diagram_path(id: @diagram.id))
    else
      flash[:alert] = "Diagram was not created"
      redirect_to(new_diagram_path)
    end
  end

  def edit
    @diagram = Diagram.find_by_id(params[:id])
  end

  def update

  end

  private

  def diagram_params
    params.require(:diagram).permit(:name, :description, :user_id, :image)
  end

  def require_edit_permission
    diagram = Diagram.find_by_id(params[:id])
    return current_user.id == diagram.try(:user_id) ? true : false
  end

end
