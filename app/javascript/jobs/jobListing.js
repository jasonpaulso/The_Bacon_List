import React, { Component } from 'react'
import ReactDOM from 'react-dom'
import { BrowserRouter as Router, Route, Link, Switch, withRouter } from 'react-router-dom'
import EditJob from './editJob'

class JobListing extends Component {

  handleSubmit(event) {
    console.log(event)
  }

  render() {
    const { jobs } = this.props

    return (

          <ul>
        {jobs && jobs.length &&
          jobs.map((job, i) => {
            const path = { pathname: "/new", job: job, handleSubmit: e => this.handleSubmit(e) }
            return (
            <div key={i}> 
              <h4>{job.title}</h4> 
              <p>{job.description}</p>
              <input type="submit" value="Delete Job"/>
              <Link to={path} className=''>Edit Job</Link>

            </div>
              )
          })
        }
        </ul>







      )

  }

}

export default JobListing;
