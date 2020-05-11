class AddNiceLookingDateToStory < ActiveRecord::Migration[6.0]
  def change
    add_column :stories, :date, :string
  end
end
