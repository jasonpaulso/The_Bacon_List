import React, { Component } from 'react'
import ReactDOM from 'react-dom'
import { BrowserRouter as Router, Route, Link, Switch, withRouter } from 'react-router-dom'
import EditJob from './editJob'
import Moment from 'moment'
import SmoothCollapse from 'react-smooth-collapse'
import sortBy from 'sort-by'
import chevron from './assets/images/chevron.svg'
import chevronDown from './assets/images/chevron-down.svg'
import GoogleMaps from './maps'



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

  renderOpenCloseButton() {
    if (!this.state.expanded) {
      return (
        <span className="chevron-container">
          <span>Open</span> 
          <img src={chevronDown} alt="" className="chevron"/>
        </span>
        )
    } else {
      return (
        <span className="chevron-container open">
          <span>Close</span> 
          <img src={chevron} alt="" className="chevron"/>
        </span>
        )
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
                <div className="job-logo" style={{backgroundImage:`url(${job.logo_url})`}}></div>
              </div>
              <div className="job-listing-preview col-sm-9">
                <div className="preview-content">
                  {this.renderDate(job.created_at)}
                  <h4>{job.title}</h4>
                  <h4>{job.company}</h4>
                </div>
              </div>
                <div className="col-sm-1 expand-button-container"><Link to={""} onClick={(event) => this.updateExpandState(event)}>{this.renderOpenCloseButton()}</Link></div>
              </div>

            </div>
            <SmoothCollapse expanded={expanded}>
            <div className="row job-content-container">
            <div className="col-sm-2"></div>
            <div className="job-content col-sm-5">
            <h4>About this Job</h4>
            <p>{job.description}</p>

            </div>
            <div className="col-sm-5">
              <div className="map-container" id="map"><GoogleMaps address={job.street_address} city={job.city} state={job.state} companyName={job.company}/></div>
              <span>{job.street_address}</span>
              <br/>
              <span>{job.city} {job.state} {job.zip.toString()}</span>
              <br/> 
              {job.phone_number}
            </div>
            </div>
            <div className="job-listing-buttons-row row">
              <div className="col-sm-2"></div>
              <div className="col-sm-8"><a className="" href={`mailto:${job.contact_address}?Subject=${job.title}`} style={{fontSize: "10px"}}><div className="button-container btn">Contact</div></a></div>
              <div className="col-sm-2 right-button-column"><Link className="" to={`/form/${job.id}`}><div className="button-container btn">Edit Job</div></Link></div>
            </div>
            </SmoothCollapse>
          </div>
        </div>
      )

  }

}
export default JobListing;

