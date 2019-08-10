import React from 'react'
import PropTypes from 'prop-types'

import Entry from './Entry'
import { localDate } from '../utils/Localization.jsx'

class Group extends React.Component {
  constructor(props) {
    super(props)
    this.state = { entries: this.props.group.entries }
  }

  // FIXME doesn't work when added new entries
  // TODO refactor to use only 1 method with if else based on attribute name?
  handleGroupAmountsChange = (entry_id, entry_amount) => {
    this.setState((prevState) => ({
      entries: prevState.entries.map(
        entry => (entry.id === entry_id ? Object.assign(entry, { amount: entry_amount }) : entry)
      )
    }))
  }

  handleGroupCurrenciesChange = (entry_id, entry_currency) => {
    this.setState((prevState) => ({
      entries: prevState.entries.map(
        entry => (entry.id === entry_id ? Object.assign(entry, { currency: entry_currency }) : entry)
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
            handleGroupAmountsChange={this.handleGroupAmountsChange}
            handleGroupCurrenciesChange={this.handleGroupCurrenciesChange}
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
