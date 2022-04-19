import React from 'react'
// import PropTypes from 'prop-types'

import './tasks-filter.css'

function TasksFilter({ filterContent, selected, filterBtnHandler }) {
  if (selected) {
    return (
      <button
        // onClick={() => {
        //   filterBtnHandler(filterContent)
        // }}
        className="selected"
      >
        {filterContent}
      </button>
    )
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

// TasksFilter.propTypes = {
//   filterBtnHandler: PropTypes.func,
//   filterProps: PropTypes.object.isRequired,
// }

export default TasksFilter
