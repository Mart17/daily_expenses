import React from 'react'
import PropTypes from 'prop-types'

import { localDate } from '../utils/Localization.jsx'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTrashAlt } from '@fortawesome/free-solid-svg-icons'

const Index = (props) => {
  const handleAmountChange = (id, name, value) => {
    document.getElementById(id).style.color = setAmountColor(value).color
    props.handleUpdate(id, name, value)
  }

  const setAmountColor = (amount) => {
    if (parseFloat(amount) === 0) {
      return { color: 'black' }
    } else {
      return (amount > 0 ? { color: 'green' } : { color: 'red' })
    }
  }

  const groupCalculations = (group) => {
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

  const entrySegments = props.groupedEntries.map((group, groupIndex) => {
    let entries = group.entries.map((entry) => {
      return (
        <div key={entry.id} id={entry.id} className="entry" style={setAmountColor(entry.amount)}>
          <form className="form-inline">
            <input
              className="form-control input-spaced"
              placeholder="Name"
              type="text"
              maxLength="50"
              name="name"
              defaultValue={entry.name}
              onChange={(e) => props.handleUpdate(entry.id, e.target.name, e.target.value)} />
            <input
              className="form-control input-spaced"
              placeholder="Amount"
              type="text"
              size="8"
              type="number"
              step="any"
              name="amount"
              defaultValue={entry.amount}
              onChange={(e) => handleAmountChange(entry.id, e.target.name, e.target.value)} />
            <select
              id="blabla"
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
        <span> ({groupCalculations(group)})</span>
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
