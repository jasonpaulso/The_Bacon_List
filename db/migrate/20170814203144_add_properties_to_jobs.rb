class AddPropertiesToJobs < ActiveRecord::Migration[5.1]
  def change
    add_column :jobs, :contact_address, :string
    add_column :jobs, :street_address, :string
    add_column :jobs, :city, :string
    add_column :jobs, :state, :string
    add_column :jobs, :zip, :number
    add_column :jobs, :phone_number, :string
  end
end
