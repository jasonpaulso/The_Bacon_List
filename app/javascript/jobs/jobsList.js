import React, { Component } from 'react'
import ReactDOM from 'react-dom'
import { BrowserRouter as Router, Route, Link, Switch, withRouter } from 'react-router-dom'
import Job from './jobRow'
import EditJob from "./editJob"
import escapeRegExp from 'escape-string-regexp'
import sortBy from 'sort-by'
import SortSelect from './sortSelect'
import Header from './header'

class JobsList extends Component {

  state = {
    jobsCollection: [], 
    searchResults: [],
    query: "",
    sortOption: "-created_at",
  }

  componentDidMount = () => {
    this.updateJobsList()
  }

  updateQuery = (query) => {
    this.setState({ query: query })
  }

  clearQuery = () => {
    this.setState({ query: '' })
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

  sortByDate(event) {
    event.preventDefault()
   
    this.setState({
      sortByDate: !this.state.sortByDate
    })
  }

  onSortSelect(event) {

    this.setState({
      sortOption: event.target.value
    })


  }

  render = () => {
    

    const { query, sortOption, jobsCollection } = this.state

    let showingJobs

    if (query) {
      const match = new RegExp(escapeRegExp(query), 'i')
      const titleFilter = (job) => match.test(job.title)
      const descriptionFilter = (job) => match.test(job.description)
      const companyFilter = (job) => match.test(job.company)
      showingJobs = Array.from(new Set(jobsCollection.filter(titleFilter).concat(jobsCollection.filter(descriptionFilter)).concat(jobsCollection.filter(companyFilter))))
    } else {
      showingJobs = jobsCollection
    }

    showingJobs.sort(sortBy(sortOption))
  
    return (
      <div>
        <Header value={query} onChange={(event)=> this.updateQuery(event.target.value)}/>
        <div className="row jobs-list">
          <div>
            <div className="inner-header">
              <span>Listings found: {showingJobs.length}</span>
              <span className="inner-header-right">Sort By:</span>
              <SortSelect onChange={(event)=> this.onSortSelect(event)}/>
            </div>
            {jobsCollection && showingJobs && showingJobs.map(job => { return (
              <div key={job.id} style={{ width: "100%"}}>
                <Job job={job} />
              </div>
            ) }) }
          </div>
        </div>
      </div>

      )
  }
}

export default JobsList;
