import React from 'react'
import {Button, Container, Divider, Dropdown, Label} from 'semantic-ui-react'
import chevron from './assets/images/chevron.svg'

let sortOptions = [

      {
        text: 'Sort by: Date Added',
        value: 'dateAddedDefault',
  
      },
      {
        text: 'Date Added',
        value: 'dateAdded',
  
      },
      {
        text: 'Company Name',
        value: 'companyName'
      },
      {
        text: 'Job Title',
        value: 'jobTItle'
      }
    ]



const DropdownSelection = () => (
  <Dropdown selection options={sortOptions} defaultValue="dateAddedDefault" />
  
)

export default DropdownSelection