import React from "react"
import PropTypes from "prop-types"

import Form from "./Form"
import Index from "./Index"

class Entries extends React.Component {
  constructor() {
    super()
    this.state = { grouped_entries: [] }
  }

  handleCreate = new_entry => {
    const body = JSON.stringify({ entry: { name: new_entry.name,
                                           amount: new_entry.amount,
                                           currency: new_entry.currency } })

    fetch('api/v1/entries.json', {
      method: 'POST',
      headers: {
				'Content-Type': 'application/json'
			},
      body: body
    }).then((response) => {
      return response.json()
    })
    .then((new_entry_data) => {
      this.createEntry(new_entry_data)
    })
  }

  createEntry = new_entry => {
    this.setState({
      // FIXME but this can create new group so it can't be with 0
      // first need to ask if the date is the same as the date of the last group?
      // if yes then append, if no then need new date group
			grouped_entries: this.state.grouped_entries[0].concat(new_entry)
		})
  }

  componentDidMount() {
	  fetch('/api/v1/current_user_entries.json')
	  	.then((response) => {
        return response.json()
      })
	  	.then((data) => {
        this.setState({ grouped_entries: data })
      })
  }

  render () {
    return (
      <React.Fragment>
        <Form handleCreate={this.handleCreate} />
        <br />
        <Index groupedEntries={this.state.grouped_entries} />
      </React.Fragment>
    )
  }
}

export default Entries
