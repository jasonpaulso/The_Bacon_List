import React, { Component } from 'react'
import ReactDOM from 'react-dom'
import { BrowserRouter as Router, Route, Link, Switch, withRouter } from 'react-router-dom'
import EditJob from './editJob'
import GoogleMapReact from 'google-map-react'
import Moment from 'moment';
import SmoothCollapse from 'react-smooth-collapse'
import sortBy from 'sort-by'

class JobListing extends Component {

  state = {
    expanded: false,
  }

  updateExpandState = (event) => {
    event.preventDefault()
    this.setState({
      expanded: !this.state.expanded
    })
  }

  renderDate = (date) => {
    Moment.locale('en')
    return(<span> {Moment(date).format('MM.D.Y')} </span>) 
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
            <div className="job-preview">
              <div className="job-preview-inner row">
              <div className="col-sm-2 logo-column flex-column">
                <div className="job-logo"></div>
              </div>
              <div className="job-listing-preview col-sm-9">
                <div className="preview-content">
                  {this.renderDate(job.created_on)}
                  <h4>{job.title}</h4>
                  <h4>{job.company}</h4>
                </div>
              </div>
                <div className="col-sm-1 expand-button-container"><Link to={""} onClick={(event) => this.updateExpandState(event)}>{this.renderOpenClose()}</Link></div>
              </div>

            </div>
            <SmoothCollapse expanded={expanded}>
            <div className="row job-content-container">
            <div className="col-sm-2"></div>
            <div className="job-content col-sm-5">
            <p>About this Job</p>
            <p>{job.description}</p>

            </div>
            <div className="col-sm-5">
              <p>Location</p>
              <div className="map-container"></div>
              <span>Address </span>
              <br/>
              <span>City, State, Zip</span>
            </div>
            </div>
            <div className="job-listing-buttons-row row">
              <div className="col-sm-2"></div>
              <div className="col-sm-8"><Link className="btn" to={``} style={{fontSize: "10px"}}>Contact</Link></div>
              <div className="col-sm-2 right-button-column"><Link className="btn" to={`/form/${job.id}`}>Edit Job</Link></div>
            </div>
            </SmoothCollapse>
          </div>
        </div>
      )

  }

}
export default JobListing;

