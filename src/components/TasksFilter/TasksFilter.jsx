import React from 'react'
import PropTypes from 'prop-types'

import './TasksFilter.scss'

function TasksFilter({ filterContent, selected, filterHandler }) {
  if (selected) {
    return <button className="selected">{filterContent}</button>
  }
  return (
    <button
      onClick={() => {
        filterHandler(filterContent)
      }}
    >
      {filterContent}
    </button>
  )
}

TasksFilter.defaultProps = {
  filterHandler: () => {
    throw new Error('filterHandler property is undefined! Check it!')
  },
}

TasksFilter.propTypes = {
  filterHandler: PropTypes.func,
  filterContent: PropTypes.string.isRequired,
  selected: PropTypes.bool.isRequired,
}

export default TasksFilter
