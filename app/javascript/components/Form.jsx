import React from 'react'
import PropTypes from 'prop-types'

class Form extends React.Component {
  constructor() {
    super()

    this.initialValue = { entry: { name: '', amount: '', currency: '' } }
    this.state = this.initialValue
  }

  handleChange = event => {
    let newState = JSON.parse(JSON.stringify(this.state))
    newState.entry[event.target.name] = event.target.value

    this.setState(newState)
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
                name="name"
                value={this.state.entry.name}
                onChange={this.handleChange} />
              <input
                className="form-control form-control-lg input-spaced"
                placeholder="Amount"
                type="text"
                size="8"
                name="amount"
                value={this.state.entry.amount}
                onChange={this.handleChange} />
              <input
                className="form-control form-control-lg input-spaced"
                placeholder="Currency"
                type="text"
                size="3"
                name="currency"
                value={this.state.entry.currency}
                onChange={this.handleChange} />
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
