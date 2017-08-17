class RemoveCenterColumnFromJobs < ActiveRecord::Migration[5.1]
  def change
    remove_column :jobs, :center
  end
end
