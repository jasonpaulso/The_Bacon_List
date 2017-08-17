class AddColumnToJobs < ActiveRecord::Migration[5.1]
  def change
    add_column :jobs, :center, :data
  
  end
end
