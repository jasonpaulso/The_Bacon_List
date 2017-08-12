import React, { Component } from 'react'
import ReactDOM from 'react-dom'
import { BrowserRouter as Router, Route, Link, Switch, withRouter } from 'react-router-dom'
import JobListing from './jobListing'
import EditJob from "./editJob"

class App extends Component {

  state = {
    jobs: []
  }

  componentDidMount = () => {
    this.updateJobsList()
  }

  getJobs = () => {
    const getJobsApi = '/api/v1/jobs.json';
    return fetch(getJobsApi).then(returnedValue => {
      return returnedValue.json()
    }).then( json => {
      return json
    })
  }

  updateJobsList = () => {
    this.getJobs().then(returnedValue => {
      this.setState({
        jobs: returnedValue
      })
    })
  }

  render = () => {

    const JobForm = (props) => {
      return (
        <EditJob 
          updateJobList= {e => this.updateJobsList(e)}
          {...props}
        />
      )
    }

    const { jobs } = this.state

    return (
      <Switch>
        <Route exact path="/" render={({history}) => (
          <div className="container"><h1>Job List | <Link to={{ pathname: '/form', query: { updateJobList: e => this.props.updateJobList(e) } }} style={{fontSize: ""}} >Add Job</Link></h1>
            <JobListing jobs={jobs}/>
          </div>
        )}/>
        <Route path="/form/:jobId?" render={JobForm}/> 
      </Switch>
    )
  }
}

export default App;