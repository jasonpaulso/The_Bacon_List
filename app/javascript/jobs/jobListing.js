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
        <div>
              
            <div  className="job-row">
              <div className="job-preview row">
              <div className="col-sm-2 test-border logo-column">
                <div className="job-logo"></div>
              </div>
                
                  <div className="job-listing-preview col-sm-8 test-border">
                    {this.renderDate(job.created_on)}
                    <h4>{job.title}</h4>
                    <h4>{job.company}</h4>
                  </div>
                  <div className="job-dropdown-container col-sm-2 test-border">
                    <a href="" onClick={(event) => this.updateExpandState(event)}>{this.renderOpenClose()}</a>
                  </div>
                
              </div>
              <SmoothCollapse expanded={expanded}>
                <div className="row job-content-container">
                  <div className="col-sm-2"></div>
                  <div className="job-content col-sm-5">
                    <p>{job.description}</p>
                    
                  </div>
                  <div className="col-sm-5">
                    <div className="map-container"></div>
                  </div>
                </div>
                <div className="job-listing-buttons-row row">
                  <Link to={`/form/${job.id}`} style={{fontSize: "10px"}}>Edit Job</Link>
                </div>
              </SmoothCollapse>
            </div>
        </div>
      )

  }

}
export default JobListing;


