import React from 'react'
import PropTypes from 'prop-types'

import Group from './Group'

const Index = (props) => {
  const groups = props.groupedEntries.map((group, groupIndex) => {
    return (
      <div key={groupIndex}>
        <Group
          group={group}
          groupIndex={groupIndex}
          handleUpdate={props.handleUpdate}
          handleDelete={props.handleDelete} />
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

export default Index
