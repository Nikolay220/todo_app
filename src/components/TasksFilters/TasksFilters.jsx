import React from 'react'
import PropTypes from 'prop-types'

import FILTERS from '../../filters'
import TasksFilter from '../TasksFilter'
import './TasksFilters.scss'
const { ALL, ACTIVE, COMPLETED } = FILTERS
let numOfFilters = 3
let filtersContents = [ALL, ACTIVE, COMPLETED]
function createListItem(filterId, filterHandler, curFilter, filterContent) {
  return (
    <li key={filterId}>
      <TasksFilter filterHandler={filterHandler} selected={curFilter === filterContent} filterContent={filterContent} />
    </li>
  )
}

export default function TasksFilters({ curFilter, filterHandler }) {
  const filters = []
  for (let i = 0; i < numOfFilters; i++) {
    filters.push(createListItem(i, filterHandler, curFilter, filtersContents[i]))
  }
  return <ul className="filters">{filters}</ul>
}

TasksFilters.defaultProps = {
  // не стал добавлять нефункциональным элементам
  // дефолтные значения, потому что это ненаглядно (ошибка
  // в месте причины не формируется), зато propTypes увидит,
  // что нет этого свойства и объяснит причину в Warningе.
  filterHandler: () => {
    throw new Error('filterHandler property is undefined! Check it!')
  },
}
TasksFilters.propTypes = {
  filterHandler: PropTypes.func,
  curFilter: PropTypes.string.isRequired,
}
