class CreateIdeas < ActiveRecord::Migration[6.1]
  def change
    create_table :ideas do |t|
      t.string :label
      t.text :description
      t.integer :canvas_id
      t.string :url
      t.string :shape_type
      t.integer :x_pos
      t.integer :y_pos
      t.float :diameter

      t.timestamps
    end
  end
end
