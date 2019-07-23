import React from 'react'
import PropTypes from 'prop-types'

class Form extends React.Component {
  constructor() {
    super()

    this.initial_value = { entry: { name: '', amount: '', currency: '' } }
    this.state = this.initial_value
  }

  handleChange = event => {
    let new_state = JSON.parse(JSON.stringify(this.state))
    new_state.entry[event.target.name] = event.target.value

    this.setState(new_state)
  }

  submitForm = () => {
    this.props.handleCreate(this.state.entry)
    this.setState(this.initial_value)
  }

  render () {
    return (
      <div>
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
      </div>
    )
  }
}

export default Form
