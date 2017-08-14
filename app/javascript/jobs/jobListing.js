import React, { Component } from 'react'
import ReactDOM from 'react-dom'
import { BrowserRouter as Router, Route, Link, Switch, withRouter } from 'react-router-dom'
import EditJob from './editJob'
import GoogleMapReact from 'google-map-react'
import Moment from 'moment';
import SmoothCollapse from 'react-smooth-collapse'

class JobListing extends Component {

  state = {
    expanded: false
  }

  componentDidMount() {
    console.log("mounted.  ")
  }

  updateExpandState = (event) => {
    event.preventDefault()
    this.setState({
      expanded: !this.state.expanded
    })
  }

  renderDate = (date) => {
    Moment.locale('en')
    return(<span> {Moment(date).format('M.D.Y')} </span>) //basically you can do all sorts of the formatting and others
  }

  render = () => {
    const { job } = this.props
    const { expanded } = this.state
    
      return (
        <div style={{width: "100%"}}>
              
            <div key={job.id} className="job-row-container">
              <div className="job-preview-container">
              <div className="job-listing-logo-container"></div>
              <div className="job-preview-detail-container">
                {this.renderDate(job.created_on)}
                <h4>{job.title}</h4>
                <h4>Google</h4>
              </div>
              <div className="job-preview-detail-show-container">
                <a href="" onClick={(event) => this.updateExpandState(event)}>Expand</a>
              </div>
              </div> 
              <SmoothCollapse expanded={expanded}>
                <p>{job.description}</p>
                <Link to={`/form/${job.id}`} style={{fontSize: "10px"}}>Edit Job</Link>
              </SmoothCollapse>
            </div>
        </div>
      )

  }

}
export default JobListing;
