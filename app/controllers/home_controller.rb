class HomeController < ActionController::Base
  before_action :authenticate_user!
  layout "application"

  def index
    return redirect_to diagrams_path
  end
end
