import React, { Component } from "react";
import chevron from './assets/images/chevron.svg'
import chevronDown from './assets/images/chevron-down.svg'

class SortSelect extends Component {

  state = { 
    sortValue: ""
    }

 updateSortState = (option) => {
    this.setState({
      sortValue: option
    })
  }


  handleOptionSelect = (event) => {

    const { onChange } = this.props
    const { updateSortState } = this

    const option = event.target.value

    updateSortState(option)

    onChange(event)
  }

  render() {

    const sortOptions = [
        {
          name: 'Newest',
          value: '-created_at'
        },
        {
          name: 'Oldest',
          value: 'created_at'
        },
        {
          name: 'Company Name',
          value: 'company'
        },
        {
          name: 'Job Title',
          value: 'title'
        }
      ] 
    const { sortValue } = this.state
    const { handleOptionSelect } = this
        
    const createItem = (item, key) =>

      <option
        className="dropdown-option"
        key={key}
        value={item.value}
      >
        {item.name}
      </option>
    return(
      <div >
        <select 
          id="sort"
          onChange={event => handleOptionSelect(event)}
          value={sortValue}
          className="sort-Select-style"
          style={{background:`transparent url(${chevronDown}) no-repeat 100% 50%`}}
        >
          {sortOptions.map(createItem)}
          
        </select>
      </div>
      )
  }
}

export default SortSelect



