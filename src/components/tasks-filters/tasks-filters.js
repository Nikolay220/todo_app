import React from 'react'
// import PropTypes from 'prop-types'

import TasksFilter from '../tasks-filter'
import './tasks-filters.scss'

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

// TasksFilters.defaultProps = {
//   // не стал добавлять нефункциональным элементам
//   // дефолтные значения, потому что это ненаглядно (ошибка
//   // в месте причины не формируется), зато propTypes увидит,
//   // что нет этого свойства и объяснит причину в Warningе.
//   clearCompletedTasksHandler: () => {
//     throw new Error('clearCompletedTasksHandler property is undefined! Check it!')
//   },
//   filterBtnHandler: () => {
//     throw new Error('filterBtnHandler property is undefined! Check it!')
//   },
// }
// TasksFilters.propTypes = {
//   clearCompletedTasksHandler: PropTypes.func,
//   filterListItems: PropTypes.array.isRequired,
//   filterBtnHandler: PropTypes.func,
//   activeItems: PropTypes.number.isRequired,
// }
