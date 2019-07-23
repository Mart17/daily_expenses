import React from 'react'
import PropTypes from 'prop-types'

import { localDate } from '../utils/Localization.jsx'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTrashAlt } from '@fortawesome/free-solid-svg-icons'

class Index extends React.Component {
  handleChange = (e, id) => {
    this.props.handleUpdate(id, e.target.name, e.target.value)
  }

  render () {
    const entry_segments = this.props.groupedEntries.map((group, group_index) => {
      let entries = group.entries.map((entry) => {
        return (
          <div key={entry.id}>
            <form className="form-inline">
              <input
                className="form-control input-spaced"
                placeholder="Name"
                type="text"
                name="name"
                defaultValue={entry.name}
                onChange={(e) => this.handleChange(e, entry.id)} />
              <input
                className="form-control input-spaced"
                placeholder="Amount"
                type="text"
                size="8"
                name="amount"
                defaultValue={entry.amount}
                onChange={(e) => this.handleChange(e, entry.id)} />
              <input
                className="form-control input-spaced"
                placeholder="Currency"
                type="text"
                size="3"
                name="currency"
                defaultValue={entry.currency}
                onChange={(e) => this.handleChange(e, entry.id)} />
              <FontAwesomeIcon
                icon={faTrashAlt}
                onClick={() => { if (window.confirm('Are you sure?'))
                                    this.props.handleDelete(entry.id, group_index) }}/>
            </form>
          </div>
        )
      })

      return (
        <div key={group.date}>
          <b>
            {localDate(group.date, 'en-US')}
          </b>
          <br />
          {entries}
          <br />
        </div>
      )
    })

    return (
      <div>
        <h4>Your Entries</h4>
        {entry_segments}
      </div>
    )
  }
}

export default Index
