class CreateCanvas < ActiveRecord::Migration[6.1]
  def change
    create_table :canvas do |t|
      t.integer :diagram_id
      t.string :image_url

      t.timestamps
    end
  end
end
