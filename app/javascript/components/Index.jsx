import React from 'react'
import PropTypes from 'prop-types'

import Group from './Group'

class Index extends React.Component {
  render () {
    const groups = this.props.groupedEntries.map((group, groupIndex) => {
      return (
        <div key={groupIndex}>
          <Group
            group={group}
            groupIndex={groupIndex}
            handleUpdate={this.props.handleUpdate}
            handleDelete={this.props.handleDelete} />
        </div>
      )
    })

    return (
      <div>
        <h4>Your Entries</h4>
        {groups}
      </div>
    )
  }
}

export default Index
