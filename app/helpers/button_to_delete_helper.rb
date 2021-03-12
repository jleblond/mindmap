module ButtonToDeleteHelper

  def button_to_delete(title, url, options = {})
    html_options = {
      class: "button-to-delete",
      method: "delete"
    }.merge(options.delete(:html_options) || {})

    form_for :delete, url: url, html: html_options do |f|
      f.submit title, options
    end
  end
end