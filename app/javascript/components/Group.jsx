import React from 'react'
import PropTypes from 'prop-types'

import Entry from './Entry'
import { localDate } from '../utils/Localization.jsx'

class Group extends React.Component {
  constructor(props) {
    super(props)
    this.state = { entries: props.group.entries }
  }

  static getDerivedStateFromProps(props, currentState) {
    if (props.group.entries.length !== currentState.entries.length) {
      return {
        entries: props.group.entries
      }
    } else {
      return currentState
    }
  }

  handleGroupChange = (entry_id, attribute, value) => {
    this.setState((prevState) => ({
      entries: prevState.entries.map(
        entry => (entry.id === entry_id ? Object.assign(entry, { [attribute]: value }) : entry)
      )
    }))
  }

  groupCalculations = (entries) => {
    // find all used currencies
    const usedCurrencies  = [...new Set(entries.map(e => e.currency))]

    // calculate sum for each currency
    const currencyAmounts = {}
    usedCurrencies.forEach(function(currency) {
      let currencyEntries = entries.filter(entry => {
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

  render() {
    const group = this.props.group

    let entries = group.entries.map((entry) => {
      return (
        <div key={entry.id}>
          <Entry
            entry={entry}
            groupIndex={this.props.groupIndex}
            handleGroupChange={this.handleGroupChange}
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
        <span className="calculations"> ({this.groupCalculations(this.props.group.entries)})</span>
        <br />
        <div className="entry-group">
          {entries}
        </div>
        <br />
      </div>
    )
  }
}

export default Group
