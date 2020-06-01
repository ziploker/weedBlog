class AddTopicToStory < ActiveRecord::Migration[6.0]
  def change
    add_column :stories, :topic, :string
  end
end
