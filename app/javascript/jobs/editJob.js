import React, { Component } from 'react'
import ReactDOM from 'react-dom'
import { BrowserRouter as Router, Route, Link, Switch, withRouter } from 'react-router-dom'


class EditJob extends Component {

  state = {
    id: "",
    title: "",
    description: ""
  }

  handleInputChange(event) {
    const target = event.target;
    const value = event.target.value
    const name = target.name;
    console.log(value)

    this.setState({
      [name]: value
    }, console.log(this.state.job))
    console.log(this.state.job)
  }

  componentDidMount() {
    if (this.props.location.job != undefined) {
      this.setState({
          id: this.props.location.job.id,
          id: this.props.location.job.title,
          id: this.props.location.job.description
      })
    }
    
  }

  postNewJob(event) {

    event.preventDefault()

    let body = { job: { title: this.state.title, description: this.state.description} }
    console.log(body)

    fetch('/api/v1/jobs', {
      method: 'POST',
      body: JSON.stringify({
        title: this.state.title,
        description: this.state.description,
      }),
      headers: {
      'Content-Type': 'application/json'
    },
    }).then(returnedValue => {

      // this.updateJobsList()
      // history.push('/new-location')
      console.log(returnedValue)
    })
  }

  render() { 

    let job 
    if (this.props.location.job != undefined) {
      job = this.props.location.job
    } else {
      job = this.state
    }
    
    return (
      <div className="container"><h1>Add Job</h1>

        <form onSubmit={event => this.postNewJob(event)}>
        <input name="jobId" defaultValue={job.id} hidden={true} onChange={e => this.handleInputChange(e)} />
        <label>
          Title:
          <input
            name="title"
            type="text"
            defaultValue={job.title}
            onChange={e => this.handleInputChange(e)} />
        </label>
        <br />
        <label>
          Description:
          <input
            name="description"
            type="text"
            defaultValue={job.description}
            onChange={e => this.handleInputChange(e)} />
        </label>
        <input type="submit" value="Submit" />
      </form>
      <div className="">
          <Link to='/' className=''>Go Back</Link>
      </div>

        </div>)

  }

}

export default EditJob;
