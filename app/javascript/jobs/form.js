import React from 'react';
import { render } from 'react-dom';
import Form, { Input, Fieldset } from 'react-semantic-form'

// Define your form attributes
const attributes = [
    { type: "Text", name: "username", required: true, label: "Username" },
    { type: "Date", name: "dob", required: true, label: "Date of Birth"},
    { type: "TextArea", name: "description", label: "Description" }
];

// Render the form within your UI
class JobEditForm extends React.Component {
  render() {
    return (
      <Form>
        <Input type="Text" name="username" label="Username"
              required={true} />,
        <Input type="Date" name="dob" label="Date of Birth"
              required={true} />
        <Input type="TextArea" name="description" label="Description" />

        <Fieldset label="">
          <button className="btn btn-primary" type="submit">Post</button>
        </Fieldset>
      </Form>
      )
  }
}
export default JobEditForm
