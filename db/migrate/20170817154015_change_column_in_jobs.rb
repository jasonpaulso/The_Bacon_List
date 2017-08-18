class ChangeColumnInJobs < ActiveRecord::Migration[5.1]
  def change
    add_column :jobs, :zip, :string
  end
end
