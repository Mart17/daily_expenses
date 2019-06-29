import React from "react"
import PropTypes from "prop-types"

class Index extends React.Component {
  formatDate = (date) => {
    return (
      new Date(`${date}`).toLocaleDateString("en-US")
    )
  }

  render () {
    const entry_segments = this.props.groupedEntries.map((group) => {
      let entries = group.entries.map((entry) => {
        return (
          <div key={entry.id}>
            {entry.name}: {entry.amount} {entry.currency}
          </div>
        )
      })

      return (
        <div key={group.date}>
          <b>
            {this.formatDate(group.date)}
          </b>
          <br />
          {entries}
          <br />
        </div>
      )
    })

    return (
      <div>
        <h4>Your Entries:</h4>
        {entry_segments}
      </div>
    )
  }
}

export default Index
