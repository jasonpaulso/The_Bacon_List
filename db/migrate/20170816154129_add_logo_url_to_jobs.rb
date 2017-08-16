class AddLogoUrlToJobs < ActiveRecord::Migration[5.1]
  def change
    add_column :jobs, :logo_url, :string
  end
end
