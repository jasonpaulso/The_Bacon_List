import React, { Component } from 'react'
import ReactDOM from 'react-dom'
import { BrowserRouter as Router, Route, Link, Switch, withRouter } from 'react-router-dom'
import JobListing from './jobListing'
import EditJob from "./editJob"

class App extends Component {

  state = {
    jobs:[],
    newJobTitle: "",
    newJobDescription: "",
    activeJobId: 0,
    history: ''
  }

  handleInputChange(event) {
    const target = event.target;
    const value = event.target.value
    const name = target.name;

    this.setState({
      [name]: value
    })

  }
  handleJobUpdateButton(job) {
    this.setState({
      history: '/new'
    })
    fetch(`/api/v1/jobs/${job.id}`, {

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
      
    })
  }

  componentDidMount() {

    this.updateJobsList()
  }

  updateJobsList() {
    this.getJobs().then(returnedValue => {
      this.setState({
        jobs: returnedValue,
        newJobTitle: "",
        newJobDescription: "",
        activeJobId: 0
      })
    })
  }

  handleSubmit(event) {

    event.preventDefault()
    console.log(this.state.activeJobId === null)
    console.log(this.props.jobId)
    if (this.state.activeJobId === null) {
      this.postNewJob()
    } else {
      this.editJob(this.state.activeJobId)
    }
    
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

  handleSubmit(event) {
    event.preventDefault()
    console.log("submitting from main")
    console.log(event.target.id.value)

    let jobForm = event.target 
    // fetch('/api/v1/jobs', {
    //   method: 'POST',
    //   body: JSON.stringify({
    //     title: jobForm.title.value,
    //     description: jobForm.description.value,
    //   }),
    //   headers: {
    //   'Content-Type': 'application/json'
    // },
    // }).then(returnedValue => {

    //   this.updateJobsList()
    //   // history.push('/new-location')
    //   console.log(returnedValue)
    // })

  }



  render() {

    const { jobs } = this.state

    return (
      <div>
      <Switch>
        <Route exact path="/" render={({history}) => (
        
        <div className="container"><h1>Job List</h1>

          <JobListing jobs={jobs} handleSubmit={e => this.handleSubmit(e)}/>

        <div className="add-job">
          <Link to='/new' className=''>Add Job</Link>
        </div>
        </div>
        )}/>
        <Route path="/new" component={EditJob}/>
        
      </Switch>
      </div>
      )
  }
}

export default App;