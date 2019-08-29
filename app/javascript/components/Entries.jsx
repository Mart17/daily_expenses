import React from 'react'
import PropTypes from 'prop-types'

import Form from './Form'
import Index from './Index'
import axios from 'axios'
import { localDate } from '../utils/Localization.jsx'
import { debounce } from 'throttle-debounce'

class Entries extends React.Component {
  constructor(props) {
    super(props)
    this.state           = { groupedEntries: [] }
    this.authToken       = props.authenticity_token
    this.defaultCurrency = props.default_currency
  }

  setHeaders = () => {
    axios.defaults.xsrfCookieName = "CSRF-TOKEN"
    axios.defaults.xsrfHeaderName = "X-CSRF-Token"
    axios.defaults.withCredentials = true

    return (
      {
        'Content-Type': 'application/json',
      }
    )
  }

  handleCreate = newEntry => {
    const body = JSON.stringify({ entry: { name: newEntry.name,
                                           amount: newEntry.amount,
                                           currency: newEntry.currency } })

    fetch('/api/v1/entries.json', {
      method: 'POST',
      headers: this.setHeaders(),
      body: body
    }).then((response) => {
      return response.json()
    })
    .then((newEntryData) => {
      this.createEntry(newEntryData)
    })
  }

  createEntry = newEntry => {
    // if the new entry has new date, then display new group. Otherwise append to the first group
    if ((this.state.groupedEntries.length === 0) || (localDate(this.state.groupedEntries[0].date,
      'en-US') !== localDate(newEntry.created_at, 'en-US'))) {

      let newGroup = { date: localDate(newEntry.created_at, 'en-US'),
                        entries: [newEntry] }

      this.setState({ groupedEntries: [newGroup].concat(this.state.groupedEntries) })
    } else {
      let groupedEntriesCopy = JSON.parse(JSON.stringify(this.state.groupedEntries))
      groupedEntriesCopy[0].entries = [newEntry].concat(groupedEntriesCopy[0].entries)

      this.setState({ groupedEntries: groupedEntriesCopy })
    }
  }

  handleUpdate = (id, attribute, value) => {
    const body = JSON.stringify({ entry: { [attribute]: value } })

    fetch(`/api/v1/entries/${id}.json`, {
      method: 'PUT',
      headers: this.setHeaders(),
      body: body
    })
  }

  handleDelete = (id, groupIndex) => {
    fetch(`/api/v1/entries/${id}.json`, {
      method: 'DELETE',
      headers: this.setHeaders()
    }).then((response) => {
      this.deleteEntry(id, groupIndex)
    })
  }

  deleteEntry(id, groupIndex) {
    let updatedGroupedEntries = JSON.parse(JSON.stringify(this.state.groupedEntries))
    let updatedGroup          = updatedGroupedEntries[groupIndex]

    if (updatedGroup.entries.length === 1) {
      // remove whole group with its only entry
      updatedGroupedEntries.splice(groupIndex, 1)
    } else {
      // remove only specific entry but keep its group
      updatedGroup.entries = updatedGroup.entries.filter((entry) => {
        return entry.id !== id
      })

      updatedGroupedEntries[groupIndex] = updatedGroup
    }

    this.setState({ groupedEntries: updatedGroupedEntries })
  }

  componentDidMount() {
	  axios.get('/api/v1/current_user_entries.json', {
      headers: this.setHeaders()
    })
  	.then((response) => {
      this.setState({ groupedEntries: response.data })
    })
  }

  render () {
    this.handleUpdate = debounce(1000, this.handleUpdate)

    return (
      <React.Fragment>
        <Form
          handleCreate={this.handleCreate}
          defaultCurrency={this.defaultCurrency} />
        <br /><br />
        <Index
          groupedEntries={this.state.groupedEntries}
          handleUpdate={this.handleUpdate}
          handleDelete={this.handleDelete} />
      </React.Fragment>
    )
  }
}

export default Entries
