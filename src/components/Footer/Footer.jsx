import React from 'react'
import PropTypes from 'prop-types'

import TasksFilters from '../TasksFilters'

import './Footer.scss'

function Footer({ clearCompletedTasksHandler, curFilter, filterHandler, activeItems }) {
  return (
    <footer className="footer">
      <span className="todo-count">{activeItems} items left</span>
      <TasksFilters curFilter={curFilter} filterHandler={filterHandler} />
      <button onClick={clearCompletedTasksHandler} className="clear-completed">
        Clear completed
      </button>
    </footer>
  )
}

Footer.defaultProps = {
  // не стал добавлять нефункциональным элементам
  // дефолтные значения, потому что это ненаглядно (ошибка
  // в месте причины не формируется), зато propTypes увидит,
  // что нет этого свойства и объяснит причину в Warningе.
  clearCompletedTasksHandler: () => {
    throw new Error('clearCompletedTasksHandler property is undefined! Check it!')
  },
  filterHandler: () => {
    throw new Error('filterHandler property is undefined! Check it!')
  },
}
Footer.propTypes = {
  clearCompletedTasksHandler: PropTypes.func,
  curFilter: PropTypes.string.isRequired,
  filterHandler: PropTypes.func,
  activeItems: PropTypes.number.isRequired,
}
export default Footer
