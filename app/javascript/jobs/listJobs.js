import React, { Component } from 'react'
import ReactDOM from 'react-dom'
import { BrowserRouter as Router, Route, Link, Switch, withRouter } from 'react-router-dom'
import JobListing from './jobListing'
import EditJob from "./editJob"
import escapeRegExp from 'escape-string-regexp'
// import sortBy from 'sort-by'

class App extends Component {

  state = {
    jobsCollection: [], 
    searchResults: [],
    query: ""
  }
  updateQuery = (query) => {
    this.setState({ query: query })
  }

  clearQuery = () => {
    this.setState({ query: '' })
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
        jobsCollection: returnedValue
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

    const { jobsCollection } = this.state
    const { query } = this.state

    let showingJobs

    if (query) {
      const match = new RegExp(escapeRegExp(query), 'i')
      showingJobs = Array.from(new Set(jobsCollection.filter((job) => match.test(job.title)).concat(jobsCollection.filter((job) => match.test(job.description))))) 
    } else {
      showingJobs = jobsCollection
    }

    return (
      <Switch>
        <Route exact path="/" render={({history}) => (

          <div className="container"><h1>Job List | <Link to={{ pathname: '/form', query: { updateJobList: e => this.props.updateJobList(e) } }} style={{fontSize: ""}} >Add Job</Link></h1>
            <div>
            <input
            className='search-jobs'
            type='text'
            placeholder='Search Jobs'
            value={query}
            onChange={(event) => this.updateQuery(event.target.value)}
          />
          </div>
          <div><JobListing jobs={showingJobs}/></div>
          </div>
        )}/>
        <Route path="/form/:jobId?" render={JobForm}/> 
      </Switch>
    )
  }
}

export default App;