class CreateDiagrams < ActiveRecord::Migration[6.1]
  def change
    create_table :diagrams do |t|
      t.string :name, null: false
      t.text :description
      t.integer :user_id, null: false

      t.timestamps
    end
  end
end
