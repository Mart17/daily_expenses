import React from 'react'
import PropTypes from 'prop-types'

import { localDate } from '../utils/Localization.jsx'

class Index extends React.Component {
  render () {
    const entry_segments = this.props.groupedEntries.map((group) => {
      let entries = group.entries.map((entry) => {
        return (
          <div key={entry.id}>
            {entry.name}: {entry.amount} {entry.currency}
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
