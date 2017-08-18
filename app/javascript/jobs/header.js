import React, { Component } from 'react'
import ReactDOM from 'react-dom'
import { BrowserRouter as Router, Route, Link, Switch, withRouter } from 'react-router-dom'

class Header extends Component {


  renderHeaderRight = () => {
    if (this.props.isEditing) {
      return (
        <Link to={ "/"} className="button-container btn">
          Go Back
        </Link>
      )
    } else {
      return (
        <span>
          <input className='search-jobs' type='text' placeholder='Search:' onChange={(event) => this.props.onChange(event)} />
            <Link to={ "/form"} className="button-container btn">
              Add Listing
          </Link>
        </span>
      )
    }
  }

  render = () => {
    return (
      <div className="row header">
        <h1>The Bacon List</h1>
        <div className="header-right">
          {this.renderHeaderRight()}
        </div>
      </div>
    )
  }

}

export default Header;