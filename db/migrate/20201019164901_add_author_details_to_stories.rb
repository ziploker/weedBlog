class AddAuthorDetailsToStories < ActiveRecord::Migration[6.0]
  def change
    add_column :stories, :author_nick, :string
    add_column :stories, :author_avatar, :string
  end
end
