import React, { Component } from 'react'
import ReactDOM from 'react-dom'
import { BrowserRouter as Router, Route, Link, Switch, withRouter } from 'react-router-dom'


class EditJob extends Component {

  state = {
    isLoading: true,
    id: 0,
    title: "",
    description: ""
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
      this.setState({
        title: jobJson.title,
        description: jobJson.description,
        id: jobJson.id,
        isLoading: false
      })
    })

  }

  postJob = (event) => {
    const getJobsApi = '/api/v1/jobs';
    fetch(getJobsApi, {
      method: 'POST',
      body: JSON.stringify({
        title: this.state.title,
        description: this.state.description,
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
    fetch(editJobApi, {
      method: 'PUT',
      body: JSON.stringify({
        title: this.state.title,
        description: this.state.description,
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

  render = () => {

    const job = this.state

    return (
      <div className="container"><h1>Add Job</h1>
        { job && !job.isLoading && 
          <form>
            <input name="jobId" defaultValue={job.id} hidden={true} onChange={event => this.handleInputChange(event)} />
            <label>
              Title:
            <input
              name="title"
              type="text"
              defaultValue={job.title}
              onChange={e => this.handleInputChange(e)} />
            </label>
            <br />
            <label>
              Description:
            <input
              name="description"
              type="text"
              defaultValue={job.description}
              onChange={e => this.handleInputChange(e)} />
            </label>
            <input type="submit" value="Submit" name="submit" onClick={event => this.handleJobForm(event)}/>
            {this.renderDeleteButton()}
          </form>
        }
        <div className="">
        <Link to='/' className=''>Go Back</Link>
        </div>
      </div>
    )
  }
}

export default EditJob;



