import React from 'react'
import PropTypes from 'prop-types'

import TasksFilter from '../TasksFilter'
import './TasksFilters.scss'

let numOfFilters = 3
let filtersContents = ['All', 'Active', 'Completed']
function createListItem(filterId, filterBtnHandler, curFilter, filterContent) {
  return (
    <li key={filterId}>
      <TasksFilter
        filterBtnHandler={filterBtnHandler}
        selected={curFilter === filterContent}
        filterContent={filterContent}
      />
    </li>
  )
}

export default function TasksFilters({ curFilter, filterBtnHandler }) {
  const filters = []
  for (let i = 0; i < numOfFilters; i++) {
    filters.push(createListItem(i, filterBtnHandler, curFilter, filtersContents[i]))
  }
  return <ul className="filters">{filters}</ul>
}

TasksFilters.defaultProps = {
  filterBtnHandler: () => {
    throw new Error('filterBtnHandler property is undefined! Check it!')
  },
}
TasksFilters.propTypes = {
  filterBtnHandler: PropTypes.func,
  curFilter: PropTypes.string.isRequired,
}
