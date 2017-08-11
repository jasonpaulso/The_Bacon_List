import React, { Component } from 'react';
import ReactDOM from 'react-dom'
import { BrowserRouter } from 'react-router-dom'
import { Route } from 'react-router-dom'
import { Link } from 'react-router-dom'

class App extends Component {

  state = {
    jobs:[],
    newJobTitle: "",
    newJobDescription: "",
    activeJobId: 0
  }

  handleInputChange(event) {
    const target = event.target;
    const value = event.target.value
    const name = target.name;

    this.setState({
      [name]: value
    })

  }
  handleJobUpdateButton(jobId) {
    fetch(`/api/v1/jobs/${jobId}`, {

    }).then(returnedValue => { 
      return returnedValue.json()
    }).then(json => {
      if (!json.error) {
        this.setState({
          newJobTitle: json.title,
          newJobDescription: json.description,
          activeJobId: json.id
        })
      } else {
        console.log(json.error)
      }
    })
  }

  getJobs() {
    const getJobsApi = '/api/v1/jobs.json';
    return fetch(getJobsApi).then(returnedValue => {
      return returnedValue.json()
    }).then( json => {
      return json
    }); 
  }

  postNewJob() {

    let body = { job: { title: this.state.newJobTitle, description: this.state.newJobDescription} }

    fetch('/api/v1/jobs', {
      method: 'POST',
      body: JSON.stringify({
        title: this.state.newJobTitle,
        description: this.state.newJobDescription,
      }),
      headers: {
      'Content-Type': 'application/json'
    },
    }).then(returnedValue => {

      this.updateJobsList()
      this.setState({
        newJobTitle: "",
        newJobDescription: ""
      })
    })
  }

  componentDidMount() {

    this.updateJobsList()
  }

  updateJobsList() {
    this.getJobs().then(returnedValue => {
      this.setState({
        jobs: returnedValue
      })
    })
  }

  handleSubmit(event) {
    
    event.preventDefault()
    this.postNewJob()
  }

  editJob(jobId) {
    event.preventDefault()
    fetch(`/api/v1/jobs/${jobId}`, {
      method: 'PUT',
      body: JSON.stringify({
        title: this.state.newJobTitle,
        description: this.state.newJobDescription,
      }),
      headers: {
      'Content-Type': 'application/json'
    },
    }).then(returnedValue => {

      this.updateJobsList()
    })
  }

  deleteJob(event, jobId) {
    event.preventDefault()
    // this.handleJobUpdateButton(jobId)
    fetch(`/api/v1/jobs/${parseInt(jobId)}`, {
      method: 'DELETE',
      headers: {
      'Content-Type': 'application/json'
    }
    }).then(returnedValue => { return returnedValue.json()
    }).then( json => {
      if (!json.error) {
        console.log(json.success)
        this.updateJobsList()
      } else {
        console.log(json.error)
      }
    }); 
  }

  render() {

    const { jobs } = this.state

    return (
      <div>
      <Route exact path='/' render={({history}) => (
        <div className="container">
        <div><h1>Job List</h1></div>

        <ul>
        {jobs && jobs.length &&
          jobs.map((job, i) => {
            return <li key={i}>{job.title}, {job.description}, {job.id} <input type="submit" value="Delete Job" onClick={event => this.deleteJob(event, job.id)}/><input type="submit" value="Update Job" onClick={event => this.handleJobUpdateButton(job.id)}/></li>;
          })
        }
        </ul>
        <div className="add-job">
          <Link to='/new' className=''>Add Job</Link>
        </div>
        </div>
        )}/>
      <Route path='/new' render={({history}) => (
        <div><h1>Add Job</h1>
                <form onSubmit={event => this.handleSubmit(event)}>
        <label>
          Title:
          <input
            name="newJobTitle"
            type="text"
            value={this.state.newJobTitle}
            onChange={e => this.handleInputChange(e)} />
        </label>
        <br />
        <label>
          Description:
          <input
            name="newJobDescription"
            type="text"
            value={this.state.newJobDescription}
            onChange={e => this.handleInputChange(e)} />
        </label>
        <input type="submit" value="Submit" />
      </form>
      <form onSubmit={event => this.editJob(event)}>
        <input
          name="activeJobId"
          type="number"
          onChange={event => this.handleInputChange(event)}
        >
        </input>
        <input type="submit" value="Submit" />
      </form>


        </div>
        )}/>
      </div>
      )
  }
}

export default App;