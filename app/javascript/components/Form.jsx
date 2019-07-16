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
        <form>
          <input
            placeholder="Name"
            type="text"
            name="name"
            value={this.state.entry.name}
            onChange={this.handleChange} />
          <input
            placeholder="Amount"
            type="text"
            name="amount"
            value={this.state.entry.amount}
            onChange={this.handleChange} />
          <input
            placeholder="Currency"
            type="text"
            name="currency"
            value={this.state.entry.currency}
            onChange={this.handleChange} />
          <input type="button" value="Submit" onClick={this.submitForm} />
        </form>
      </div>
    )
  }
}

export default Form
