import React from "react"
import PropTypes from "prop-types"

import Index from "./Index"

class Entries extends React.Component {
  constructor() {
    super();
    this.state = { entries: [] }
  }

  componentDidMount() {
	  fetch('/api/v1/current_user_entries.json')
	  	.then((response) => {
        return response.json()
      })
	  	.then((data) => {
        this.setState({ entries: data })
      })
  }

  render () {
    return (
      <React.Fragment>
        <Index entries={this.state.entries} />
      </React.Fragment>
    );
  }
}

export default Entries
