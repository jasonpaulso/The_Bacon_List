import React, { Component } from 'react'
import ReactDOM from 'react-dom'
import { BrowserRouter as Router, Route, Link, Switch, withRouter } from 'react-router-dom'
import JobsList from './jobsList'
import EditJob from "./editJob"
import escapeRegExp from 'escape-string-regexp'
import sortBy from 'sort-by'
import SortSelect from './sortSelect'

class App extends Component {

  getJobs = () => {
    const getJobsApi = '/api/v1/jobs.json';
    return fetch(getJobsApi).then(returnedValue => {
      return returnedValue.json()
    }).then( json => {
      return json
    })
  }

  updateJobsList = () => {
    this.getJobs()
  }

  render = () => {
    
    const form = (props) => { return ( <EditJob updateJobList= {e => this.updateJobsList(e)} {...props} /> )}
    const list = (props) => { return ( <JobsList/>)}
  
    return (
      <Router>
        <div className="main flex-direction-column">
          <Switch>
            <Route exact path="/" render={list}/>
            <Route path="/form/:jobId?" render={form}/>
          </Switch>
        </div>
      </Router>
    )
  }
}

export default App;