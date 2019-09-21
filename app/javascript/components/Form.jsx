import React from 'react'
import PropTypes from 'prop-types'

class Form extends React.Component {
  constructor(props) {
    super(props)

    this.initialValue = { entry: { name: '', amount: '', currency: props.defaultCurrency } }
    this.state = this.initialValue
  }

  handleChange = event => {
    event.persist()

    this.setState((prevState) => ({
      entry: {
        ...prevState.entry,
        [event.target.name]: event.target.value
      }
    }))
  }

  submitForm = () => {
    this.props.handleCreate(this.state.entry)
    this.setState(this.initialValue)
  }

  render () {
    return (
      <div className="entry-form">
        <fieldset>
          <h4>New Entry</h4>
          <form className="form-inline">
            <input
              className="form-control form-control-lg input-spaced"
              placeholder="Name"
              type="text"
              maxLength="50"
              name="name"
              value={this.state.entry.name}
              onChange={this.handleChange} />
            <input
              className="form-control form-control-lg input-spaced"
              placeholder="Amount"
              type="number"
              step="any"
              name="amount"
              value={this.state.entry.amount}
              onChange={this.handleChange} />
            <select
              className="form-control form-control-lg input-spaced"
              name="currency"
              title="Change default currency in the settings"
              value={this.state.entry.currency}
              onChange={this.handleChange} >
              <option value="€">€</option>
              <option value="$">$</option>
              <option value="£">£</option>
            </select>
            <input
              type="button"
              className="submit"
              value="Submit"
              onClick={this.submitForm} />
          </form>
        </fieldset>
      </div>
    )
  }
}

export default Form
