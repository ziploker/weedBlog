class AddUrlToStory < ActiveRecord::Migration[6.0]
  def change
    add_column :stories, :url, :string
  end
end
