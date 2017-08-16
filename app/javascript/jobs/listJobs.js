import React, { Component } from 'react'
import ReactDOM from 'react-dom'
import { BrowserRouter as Router, Route, Link, Switch, withRouter } from 'react-router-dom'
import JobListing from './jobListing'
import EditJob from "./editJob"
import escapeRegExp from 'escape-string-regexp'
import sortBy from 'sort-by'
import SortSelect from './sortSelect'

class App extends Component {

  state = {
    jobsCollection: [], 
    searchResults: [],
    query: "",
    sortOption: "-created_at",
  }

  componentDidMount = () => {
    this.updateJobsList()
  }

// Search Functions
  updateQuery = (query) => {
    this.setState({ query: query })
  }

  clearQuery = () => {
    this.setState({ query: '' })
  }
// End Search Functions

// Fetch and Update Jobs Listing Functions
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
// End Fetch and Update Jobs Listing Functions

// DOM Rendering Functions

  sortByDate(event) {
    event.preventDefault()
    console.log(this.state.sortByDate)
    this.setState({
      sortByDate: !this.state.sortByDate
    })
  }

  onSortSelect(event) {
  console.log("sorting by" + event.target.value)
    this.setState({
      sortOption: event.target.value
      // jobsCollection: this.state.jobsCollection.sort(sortBy(event.target.value))
    }, console.log(this.state.jobsCollection))


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
      <Switch>
        <Route exact path="/" render={({history}) => (
          <div className="main flex-direction-column">
          <div className="row header" ><h1>The Bacon</h1>
          <div className="header-right">
            <input
            className='search-jobs'
            type='text'
            placeholder='Search:'
            value={query}
            onChange={(event) => this.updateQuery(event.target.value)}
          />
          <Link to={"/form"} ><div className="button-container btn">Add Listing</div></Link>


          </div>
            
          </div>
          
          <div className="row jobs-list">
            <div className="jobs-list-header">
              <span>Listings found: {jobsCollection.length}</span>
              <span className="jobs-list-header-right">Sort By:</span> <SortSelect onChange={(event) => this.onSortSelect(event)}/>
            </div>
            {jobsCollection && showingJobs && 
              
              showingJobs.map(job => {
        return (
          <div key={job.id} style={{ width: "100%"}}>
            <JobListing job={job} />
          </div>
        )
      })


            }
          </div>
          </div>
        )}/>
        <Route path="/form/:jobId?" render={JobForm}/> 
      </Switch>
    )
  }

// End DOM Rendering Functions
}

export default App;