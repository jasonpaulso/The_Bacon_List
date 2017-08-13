import React, { Component } from 'react'
import ReactDOM from 'react-dom'
import { BrowserRouter as Router, Route, Link, Switch, withRouter } from 'react-router-dom'
import EditJob from './editJob'
import GoogleMapReact from 'google-map-react'

class JobListing extends Component {

  render = () => {
    const { jobs } = this.props

    if (jobs.length) {
      return (
        <div>
          {jobs && jobs.length &&
            jobs.map((job, i) => {
              return (
                <div key={i} style={{border: "1px solid black"}}> 
                  <h4 style={{borderBottom: "1px solid black", textAlign: "center"}}>{job.title} <Link to={{ pathname: `/form/${job.id}`}} style={{fontSize: "10px"}}>Edit Job</Link></h4>
                  <p>{job.description}</p>
                  <SimpleMap />
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
