import React, { Component } from 'react'
import ReactDOM from 'react-dom'
import { BrowserRouter as Router, Route, Link, Switch, withRouter } from 'react-router-dom'
import DropdownSelection from './dropdown'

class EditJob extends Component {

  state = {
    isEditing: false,
    isLoading: true,
    id: undefined,
    title: "",
    description: "",
    company:"",
    logo_url: "",
    phone_number: "",
    contact_address: "",
    street_address: "",
    city: "",
    state: "",
    zip: "",

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
    }, console.log(this.state))
  }

  handleJobFormSubmit = (event) => {
    event.preventDefault()
    this.postOrEditJob(event)
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
      Object.keys(job).map((key) => {
        this.setState({
          [key]: job[key]
        })
      })
      this.setState({
          isLoading: false, 
          isEditing: true
      })
    })

  }

  postOrEditJob = (event) => {
    const job = this.state
    const getJobsApi = `/api/v1/jobs/${this.state.id || ""}`;
    fetch(getJobsApi, {
      method: job.isEditing ? 'PUT' : 'POST',
      body: JSON.stringify(job),
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

  capitalizeFirstLetter = (string) => {
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
        value: "description",
        type: "textarea"
      },
      {
        name: "Company Name",
        value: "company"},
      {
        name: "Logo URL",
        value: "logo_url"},
      {
        name: "Email Address",
        value: "contact_address"
      },
      {
        name: "Phone Number", 
        value: "phone_number"},
      {
        name: "Street Address",
        value: "street_address"
      },
      {
        name: "City",
        value: "city"
      },
      {
        name: "State",
        value: "state"
      },
      {
        name: "Zip",
        value: "zip"
      }
    ]
   
    const createInput = (item, key) =>
    
    <label key={key}>
      {this.capitalizeFirstLetter(item.name)}:
      <input
        key={key}
        name={item.value}
        type={item.type || "text"}
        defaultValue={job[item.value] || ""}
        onChange={e => this.handleInputChange(e)} />
    </label>

    return (
      <div className="container"><h1>{job.isEditing? "Edit Job" : "Add New Job"}</h1>
      
        { job && !job.isLoading && 
          <form>
            <input name="jobId" defaultValue={job.id} hidden={true} onChange={event => this.handleInputChange(event)} />
            {jobFormFields.map(createInput)}
            <input type="submit" value="Submit" name="submit" onClick={event => this.handleJobFormSubmit(event)}/>
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

