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

  updateExpandState = (event) => {
    event.preventDefault()
    this.setState({
      expanded: !this.state.expanded
    })
  }

  renderDate = (date) => {
    Moment.locale('en')
    return(<span> {Moment(date).format('M.D.Y')} </span>) 
  }

  renderOpenClose() {
    if (!this.state.expanded) {
      return (<span>Open +</span>)
    } else {
      return (<span>Close -</span>)
    }
  }

  render = () => {
    const { job } = this.props
    const { expanded } = this.state
      return (
        <div style={{width: "100%"}}>
              
            <div  className="job-row-container">
              <div className="job-preview-container">
              <div className="job-listing-logo-container"></div>
              <div className="job-preview-detail-container">
                {this.renderDate(job.created_on)}
                <h4>{job.title}</h4>
                <h4>Google</h4>
              </div>
              <div className="job-preview-detail-show-container">
                <a href="" onClick={(event) => this.updateExpandState(event)}>{this.renderOpenClose()}</a>
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
