import React, { Component } from 'react'
import ReactDOM from 'react-dom'
import { BrowserRouter as Router, Route, Link, Switch, withRouter } from 'react-router-dom'
import EditJob from './editJob'
import GoogleMapReact from 'google-map-react'
import Moment from 'moment';

class JobListing extends Component {


  renderDate(date) {
    Moment.locale('en')
    return(<span> {Moment(date).format('M.D.Y')} </span>) //basically you can do all sorts of the formatting and others
  }

  render = () => {
    const { jobs } = this.props

    if (jobs.length) {
      return (
        <div style={{width: "100%"}}>
          {jobs && jobs.length &&
              
            jobs.map((job, i) => {
              return (
                <div key={i} className="job-row-container"> 
                  <div className="job-listing-logo-container"></div>
                  <div className="job-preview-detail-container">
                    {this.renderDate(job.created_on)}
                    <h4>{job.title}</h4>
                    <h4>Google</h4>
                  </div>
                  <div className="job-preview-detail-show-container">
                    <Link to={`/form/${job.id}`} style={{fontSize: "10px"}}>Edit Job</Link>
                  </div>
                </div>
              )
            })
          }
        </div>
      )
    } else {
      return null
    }

  }

}
export default JobListing;
