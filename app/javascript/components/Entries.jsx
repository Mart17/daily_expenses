import React from 'react'
import PropTypes from 'prop-types'

import Form from './Form'
import Index from './Index'
import { localDate } from '../utils/Localization.jsx'
import { debounce } from 'throttle-debounce'

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
    // if the new entry has new date, then display new grouped_entry. Otherwise append to the first one
    if (localDate(this.state.grouped_entries[0].date, 'en-US') !== localDate(
      new_entry.created_at, 'en-US')) {

      let new_group = { date: localDate(new_entry.created_at, 'en-US'),
                        entries: [new_entry] }

      this.setState({ grouped_entries: [new_group].concat(this.state.grouped_entries) })
    } else {
      let grouped_entries_copy = JSON.parse(JSON.stringify(this.state.grouped_entries))
      grouped_entries_copy[0].entries = [new_entry].concat(grouped_entries_copy[0].entries)

      this.setState({ grouped_entries: grouped_entries_copy })
    }
  }

  handleUpdate = (id, attribute, value) => {
    const body = JSON.stringify({ entry: { [attribute]: value } })

    fetch(`/api/v1/entries/${id}.json`, {
      method: 'PUT',
      headers: {
				'Content-Type': 'application/json'
			},
      body: body
    })
  }

  handleDelete = (id, group_index) => {
    fetch(`/api/v1/entries/${id}.json`, {
      method: 'DELETE',
      headers: {
				'Content-Type': 'application/json'
			}
    }).then((response) => {
      this.deleteEntry(id, group_index)
    })
    this.deleteEntry(id, group_index)
  }

  deleteEntry(id, group_index) {
    let updated_grouped_entries = JSON.parse(JSON.stringify(this.state.grouped_entries))
    let updated_group = updated_grouped_entries[group_index]

    if (updated_group.entries.length === 1) {
      // remove whole group with its only entry
      updated_grouped_entries.splice(group_index, 1)
    } else {
      // remove only specific entry but keep its group
      updated_group.entries = updated_group.entries.filter((entry) => {
        return entry.id !== id
      })

      updated_grouped_entries[group_index] = updated_group
    }

    this.setState({ grouped_entries: updated_grouped_entries })
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
    this.handleUpdate = debounce(1000, this.handleUpdate)

    return (
      <React.Fragment>
        <Form handleCreate={this.handleCreate} />
        <br />
        <Index
          groupedEntries={this.state.grouped_entries}
          handleUpdate={this.handleUpdate}
          handleDelete={this.handleDelete} />
      </React.Fragment>
    )
  }
}

export default Entries
