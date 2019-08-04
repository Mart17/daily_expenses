import React from 'react'
import PropTypes from 'prop-types'

import { setAmountColorClass } from '../utils/Colors.jsx'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTrashAlt } from '@fortawesome/free-solid-svg-icons'

class Entry extends React.Component {
  constructor(props) {
    super(props)
    this.state = { colorClass: setAmountColorClass(props.entry.amount) }
  }

  handleAmountChange = (id, name, value) => {
    this.setState({ colorClass: setAmountColorClass(value) })
    this.props.handleUpdate(id, name, value)
  }

  render() {
    const entry = this.props.entry

    return (
      <div className="entry">
        <div className={this.state.colorClass}>
          <form className="form-inline">
            <input
              className="form-control input-spaced"
              placeholder="Name"
              type="text"
              maxLength="50"
              name="name"
              defaultValue={entry.name}
              onChange={(e) => this.props.handleUpdate(entry.id, e.target.name, e.target.value)} />
            <input
              className="form-control input-spaced"
              placeholder="Amount"
              size="8"
              type="number"
              step="any"
              name="amount"
              defaultValue={entry.amount}
              onChange={(e) => this.handleAmountChange(entry.id, e.target.name, e.target.value)} />
            <select
              className="form-control input-spaced"
              name="currency"
              defaultValue={entry.currency}
              onChange={(e) => this.props.handleUpdate(entry.id, e.target.name, e.target.value)}>
              <option value="€">€</option>
              <option value="$">$</option>
              <option value="£">£</option>
            </select>
            <FontAwesomeIcon
              icon={faTrashAlt}
              onClick={() => { if (window.confirm('Are you sure?')) this.props.handleDelete(entry.id) }} />
          </form>
        </div>
      </div>
    )
  }
}

export default Entry
