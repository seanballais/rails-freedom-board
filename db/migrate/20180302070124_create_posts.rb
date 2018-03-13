class CreatePosts < ActiveRecord::Migration[5.1]
  def change
    create_table :posts do |post|
      post.string :author, null: false
      post.text :message, null: false
      post.integer :time_posted, :limit => 8, null: false
    end
  end
end
