import React from 'react'
import PropTypes from 'prop-types'

import './tasks-filter.scss'

function TasksFilter({ filterContent, selected, filterBtnHandler }) {
  if (selected) {
    return <button className="selected">{filterContent}</button>
  }
  return (
    <button
      onClick={() => {
        filterBtnHandler(filterContent)
      }}
    >
      {filterContent}
    </button>
  )
}

TasksFilter.defaultProps = {
  filterBtnHandler: () => {
    throw new Error('filterBtnHandler property is undefined! Check it!')
  },
}

TasksFilter.propTypes = {
  filterBtnHandler: PropTypes.func,
  filterContent: PropTypes.string.isRequired,
  selected: PropTypes.bool.isRequired,
}

export default TasksFilter
