  require 'pry'
  class Api::V1::JobsController < Api::V1::BaseController
  before_action :verify_requested_format! 
  def index 
    respond_with Job.all 
  end
  def show
    if job = Job.find(params[:id])
      render :json => job
    else
      render :json => { :error => "An error was encountered while finding this job. Please try again." }
    end
  end 
  def create
    # puts job_params
    # binding.pry
    respond_with :api, :v1, Job.create(job_params)
    
  end 
  def destroy 
    job = Job.find(params["id"])
    job.destroy
    if job.destroyed? 
      render :json => { :success => "Job has been deleted" }
    else 
      render :json => { :error => "An error was encountered while deleting this job. Please try again." }
    end
  end 
  def update 
    job = Job.find(params["id"]) 
    job.update_attributes(job_params) 
    respond_with job, json: job 
  end 
  
  private def job_params 
    params.require(:job).permit(:id, :title, :description) 
  end 
end
