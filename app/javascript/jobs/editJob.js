import React, { Component } from 'react'
import ReactDOM from 'react-dom'
import { BrowserRouter as Router, Route, Link, Switch, withRouter } from 'react-router-dom'
import DropdownSelection from './dropdown'
import ReactPhoneInput from 'react-phone-input'
import Header from './header'


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
    const target = event.target
    const value = event.target.value
    const name = target.name;
    this.setState({
      [name]: value
    }, console.log(this.state))
  }
  handlePhoneInputChange = (value) => {
     this.setState({
        phone_number: value
     });
  }

  handleJobFormSubmit = (event) => {
    event.preventDefault()
    this.postOrEditJob(event)
  }

  updateHomeJobListAndCloseForm = () => {
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
      this.updateHomeJobListAndCloseForm()
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
      this.updateHomeJobListAndCloseForm()
    }) 
  }

  capitalizeFirstLetter = (string) => {
    return string.charAt(0).toUpperCase() + string.slice(1);
  }

  renderInputFields = (fields, job) => {
    return (
        fields.map((item, index) => {

        { if (item.type == "tel") {
            return (
              <div className={ "form-group"} key={index}>
                <label>{this.capitalizeFirstLetter(item.name)}:</label>
                <ReactPhoneInput 
                  defaultCountry={'us'} key={index} type={item.type || "text"} 
                  className={`form-control form-${item.value}`} 
                  onChange={e=> this.handlePhoneInputChange(e)} 
                  name={item.value} pattern={item.pattern || ""} 
                  required={true} />    
              </div>
              )
          } else if (item.type == "textarea") {
            return (
              <div className={ "form-group"} key={index}>
                <textarea 
                  placeholder={this.capitalizeFirstLetter(item.name)} 
                  key={index} type={item.type || "text"} 
                  className={`form-control form-${item.value}`} 
                  onChange={e=> this.handleInputChange(e)} 
                  name={item.value} 
                  pattern={item.pattern || ""} 
                  defaultValue={job[item.value] || ""} 
                  rows={8} 
                  required={true} />       
              </div>
              )
          } else {
            return (
            <div className={ "form-group"} key={index}>
              <input 
                placeholder={this.capitalizeFirstLetter(item.name)} 
                key={index} type={item.type || "text"} 
                className={`form-control form-${item.value}`} 
                onChange={e=> this.handleInputChange(e)} 
                name={item.value} 
                pattern={item.pattern || ""} 
                defaultValue={job[item.value] || ""} 
                required={true} /> 
            </div>
          )
        }
      }
    }))
  }


  render = () => {

    const job = this.state
    const isEnabled = job.title.length > 0 && job.company.length > 0 && job.description.length > 0 && job.city.length > 0 && job.state.length > 0

    const jobFormFields = [
      {
        name: "Job Title*",
        value: "title"},
      {
        name: "Job Description*",
        value: "description",
        type: "textarea"
      },
      {
        name: "Company Name*",
        value: "company"},
      {
        name: "Logo URL",
        value: "logo_url"},
      {
        name: "Email Address",
        value: "contact_address",
        type: "email"
      },
      {
        name: "Phone Number", 
        value: "phone_number",
        type: "tel"
      },

      {
        name: "Street Address",
        value: "street_address"
      },
      {
        name: "City*",
        value: "city"
      },
      {
        name: "State*",
        value: "state"
      },
      {
        name: "Zip",
        value: "zip",
        pattern: "[0-9]{5}"
      }
    ]

    
   
    return (
      <span>
        <Header isEditing={true}/>
        <div className="row jobs-list">
          <div className="inner-header">
             <span>
                <h4>{job.isEditing? "Edit Job" : "Add New Job"}</h4>
             </span>
          </div>

          { job && !job.isLoading && 
          <form className={"job-edit-form"} >

          <input name="jobId" defaultValue={job.id} hidden={true} onChange={event => this.handleInputChange(event)} />
           {this.renderInputFields(jobFormFields, job)}
          <span className="required-message-container form-group">{!isEnabled ?  "*Required Field": ""}</span>
            <div className="form-bottom-row">
              {job.isEditing ? <button className="btn delete-button" type="submit" value="Delete" name="delete" onClick={event => this.deleteJob(event)}>Delete Job</button> : ""}
              <div className="submit-button-container" >
                <button className="btn" type="submit" value="Submit" name="submit" onClick={event => this.handleJobFormSubmit(event)} disabled={!isEnabled}>{job.isEditing ? "Save Changes" : "Submit Job"}</button>
                <div className="incomplete-alert" style={{textAlign: "center"}}>{!isEnabled ?  "Please complete the required fields.": ""}</div>
              </div>  
            </div>
          </form>
          }
        </div>
      </span>
    )
  }
}

export default EditJob;





