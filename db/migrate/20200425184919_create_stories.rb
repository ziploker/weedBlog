class CreateStories < ActiveRecord::Migration[6.0]
  def change
    create_table :stories do |t|
      t.string :title
      t.string :keywords
      t.text :body

      t.timestamps
    end
  end
end
