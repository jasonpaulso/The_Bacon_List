import React, { Component } from 'react'
import ReactDOM from 'react-dom'
import { BrowserRouter as Router, Route, Link, Switch, withRouter } from 'react-router-dom'
import DropdownSelection from './dropdown'



class EditJob extends Component {

  state = {
    isLoading: true,
    id: 0,
    title: "",
    description: "",
    company:"",
    logo_ur: "",
    phone_number: "",
    contact_address: ""
  }

  componentWillMount = () => {
    if (this.props.match.params.jobId) {
      this.fetchJob()
    } else {
      this.setState({
        isLoading: false
      })
    }
  }

  handleInputChange = (event) => {
    const target = event.target;
    const value = event.target.value
    const name = target.name;
    this.setState({
      [name]: value
    })
  }

  handleJobForm = (event) => {
    event.preventDefault()
    if (this.state.id) {
      this.editJob(event)
    } else {
      this.postJob(event)
    }
  }

  updateHomeJobList = () => {
    this.props.updateJobList()
    this.goHome()
  }

  goHome = () => {
    this.props.history.push('/')
  }

  fetchJob = () => {
    let jobId = this.props.match.params.jobId
    const getJobApi = `/api/v1/jobs/${jobId}`;
    return fetch(getJobApi).then(returnedValue => {
      return returnedValue.json()
    }).then(jobJson => {
      const job = jobJson
      this.setState({
        title: job.title,
        description: job.description,
        id: job.id,
        company: job.company,
        logo_url: job.logo_url,
        phone_number: job.phone_number,
        contact_address: job.contact_address,
        isLoading: false
      })
    })

  }

  postJob = (event) => {
    const getJobsApi = '/api/v1/jobs';
    fetch(getJobsApi, {
      method: 'POST',
      body: JSON.stringify({
        title: job.title,
        description: job.description,
        id: job.id,
        company: job.company,
        logo_url: job.logo_url,
        phone_number: job.phone_number,
        contact_address: job.contact_address,
      }),
      headers: {
      'Content-Type': 'application/json'
    },
    }).then( _ => { 
      this.updateHomeJobList()
    })
  }

  editJob = (event) => {
    event.preventDefault()
    const editJobApi = `/api/v1/jobs/${this.state.id}`
    const job = this.state
    fetch(editJobApi, {
      method: 'PUT',
      body: JSON.stringify({
        title: job.title,
        description: job.description,
        id: job.id,
        company: job.company,
        logo_url: job.logo_url,
        phone_number: job.phone_number,
        contact_address: job.contact_address,
      }),
      headers: {
        'Content-Type': 'application/json'
      },
    }).then( _ => {
      this.updateHomeJobList()
    })
  }

  deleteJob = (event) => {
    event.preventDefault()
    const deleteJobApi = `/api/v1/jobs/${this.state.id}`
    fetch(deleteJobApi, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json'
      }
    }).then( _ => { 
    }).then( _ => {
      this.updateHomeJobList()
    }) 
  }

  renderDeleteButton = () => {
    const isEditing = this.state.id
    if (isEditing) {
      return <input type="submit" value="Delete" name="delete" onClick={event => this.deleteJob(event)}/>
    }
    
  }

  capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
}
  render = () => {

    const job = this.state

    const jobFormFields = [
      {
        name: "Job Title",
        value: "title"},
      {
        name: "Job Description",
        value: "description"},
      {
        name: "Company Name",
        value: "company"},
      {
        name: "Logo URL",
        value: "logo_url"},
      {
        name: "Phone Number", 
        value: "phone_number"},
      {
        name: "Email Address",
        value: "contact_address"
      }
    ]
   
    const createInput = (item, key) =>
    
    <label key={key}>
      {this.capitalizeFirstLetter(item.name)}:
      <input
        key={key}
        name={item.value}
        type="text"
        defaultValue={job[item.value] || ""}
        onChange={e => this.handleInputChange(e)} />
    </label>

    

    return (
      <div className="container"><h1>Add Job</h1>
      
        { job && !job.isLoading && 
          <form>
            <input name="jobId" defaultValue={job.id} hidden={true} onChange={event => this.handleInputChange(event)} />
            {jobFormFields.map(createInput)}
            <input type="submit" value="Submit" name="submit" onClick={event => this.handleJobForm(event)}/>
            {this.renderDeleteButton()}
          </form>
        }
        <div className="">
        <Link to='/' className='btn'>Go Back</Link>
        </div>
      </div>
    )
  }
}

export default EditJob;

