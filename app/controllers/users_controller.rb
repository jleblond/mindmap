class UsersController < ApplicationController
  before_action :authenticate_user!, :redirect_unless_admin

  layout "application"

  def index
    @users = User.all
  end

  protected

  def redirect_unless_admin
    unless current_user.try(:admin?)
      flash[:error] = "Action requires administrator privileges"
      redirect_to root_path
    end
  end


end
