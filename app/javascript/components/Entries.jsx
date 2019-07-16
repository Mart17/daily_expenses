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
    // if the new entry has new date, then display new grouped_entry. Otherwise append to the last one
    if (new Date(this.state.grouped_entries[0].date).toLocaleDateString("en-US") !== new Date(
      new_entry.created_at).toLocaleDateString("en-US")) {

      let new_group = { date: new Date(new_entry.created_at).toLocaleDateString("en-US"),
                        entries: [new_entry] }

      this.setState({ grouped_entries: [new_group].concat(this.state.grouped_entries) })
    } else {
      let grouped_entries_copy = JSON.parse(JSON.stringify(this.state.grouped_entries))
      grouped_entries_copy[0].entries = [new_entry].concat(grouped_entries_copy[0].entries)

      this.setState({ grouped_entries: grouped_entries_copy })
    }
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
