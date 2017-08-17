class ChangeColumnInJobs < ActiveRecord::Migration[5.1]
  def change
    change_column :jobs, :zip, :string
  end
end
