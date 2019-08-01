import React from 'react'
import PropTypes from 'prop-types'

import { localDate } from '../utils/Localization.jsx'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTrashAlt } from '@fortawesome/free-solid-svg-icons'

const Index = (props) => {
  const entrySegments = props.groupedEntries.map((group, groupIndex) => {
    let entries = group.entries.map((entry) => {
      return (
        <div key={entry.id} className="entry">
          <form className="form-inline">
            <input
              className="form-control input-spaced"
              placeholder="Name"
              type="text"
              name="name"
              defaultValue={entry.name}
              onChange={(e) => props.handleUpdate(entry.id, e.target.name, e.target.value)} />
            <input
              className="form-control input-spaced"
              placeholder="Amount"
              type="text"
              size="8"
              name="amount"
              defaultValue={entry.amount}
              onChange={(e) => props.handleUpdate(entry.id, e.target.name, e.target.value)} />
            <select
              className="form-control input-spaced"
              name="currency"
              defaultValue={entry.currency}
              onChange={(e) => props.handleUpdate(entry.id, e.target.name, e.target.value)} >
              <option value="€">€</option>
              <option value="$">$</option>
              <option value="£">£</option>
            </select>
            <FontAwesomeIcon
              icon={faTrashAlt}
              onClick={() => { if (window.confirm('Are you sure?'))
                                props.handleDelete(entry.id, groupIndex) }}/>
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
        <div className="entry-group">
          {entries}
        </div>
        <br />
      </div>
    )
  })

  return (
    <div>
      <h4>Your Entries</h4>
      {entrySegments}
    </div>
  )
}

export default Index
