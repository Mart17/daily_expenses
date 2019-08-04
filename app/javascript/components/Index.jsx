import React from 'react'
import PropTypes from 'prop-types'

import Entry from './Entry'
import { localDate } from '../utils/Localization.jsx'

// TODO function component? vs. I'll need state for group calculations and colors?
class Index extends React.Component {
  groupCalculations = (group) => {
    // find all used currencies
    const usedCurrencies  = [...new Set(group.entries.map(e => e.currency))]

    // calculate sum for each currency
    const currencyAmounts = {}
    usedCurrencies.forEach(function(currency) {
      let currencyEntries = group.entries.filter(entry => {
        return entry.currency === currency
      })

      currencyAmounts[currency] = currencyEntries.reduce(
        // multiple by 100 to treat cents as integers for now
        // this is to avoid js problems with addition of decimals
        (total, entry) => total + (parseFloat(entry.amount) * 100), 0)
    })

    const displaySums = Object.keys(currencyAmounts).map((key, index) =>
      // here divide by 100 to make cents decimals again
      `${key}: ${Object.values(currencyAmounts)[index] / 100}`
    )

    return displaySums.join(', ')
  }

  render () {
    const entrySegments = this.props.groupedEntries.map((group) => {
      let entries = group.entries.map((entry) => {
        return (
          <div key={entry.id}>
            <Entry
              entry={entry}
              handleUpdate={this.props.handleUpdate}
              handleDelete={this.props.handleDelete} />
          </div>
        )
      })

      return (
        <div key={group.date}>
          <b>
            {localDate(group.date, 'en-US')}
          </b>
          <span> ({this.groupCalculations(group)})</span>
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
}

export default Index
