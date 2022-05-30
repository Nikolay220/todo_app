import React from 'react'
import PropTypes from 'prop-types'

import Task from '../Task'
import ACTIONS from '../../actions'
import FILTERS from '../../filters'
import './TaskList.scss'

const { EMPTY, COMPLETED } = ACTIONS
const { ALL, ACTIVE, COMPLETED: COMPLETED_FILTER } = FILTERS

function isTaskDisplayed(taskContent, curFilter) {
  if (curFilter === ALL) return true
  else if (curFilter === ACTIVE && taskContent.statusBeforeEditing === EMPTY) return true
  else if (curFilter === COMPLETED_FILTER && taskContent.statusBeforeEditing === COMPLETED) return true
  return false
}
class TaskList extends React.Component {
  constructor(props) {
    super(props)
  }

  componentWillUnmount() {
    Object.entries(this.intervals).forEach((value) => {
      clearInterval(value[1])
    })
  }

  render() {
    const {
      onEditFinished,
      editTaskHandler,
      todoListItems,
      onTaskClicked,
      onDeleteClicked,
      curFilter,
      onPlayTimer,
      onPauseTimer,
    } = this.props
    const completedItems = todoListItems.map((item) => {
      let listItem
      if (item.status) {
        listItem = (
          <li className={item.status} key={item.id}>
            {isTaskDisplayed(item, curFilter) && (
              <Task
                editTaskHandler={editTaskHandler}
                onDeleteClicked={onDeleteClicked}
                onTaskClicked={onTaskClicked}
                onEditFinished={onEditFinished}
                itemProps={item}
                onPlayTimer={onPlayTimer}
                onPauseTimer={onPauseTimer}
              />
            )}
          </li>
        )
      } else {
        listItem = (
          <li key={item.id}>
            {isTaskDisplayed(item, curFilter) && (
              <Task
                editTaskHandler={editTaskHandler}
                onDeleteClicked={onDeleteClicked}
                onTaskClicked={onTaskClicked}
                onEditFinished={onEditFinished}
                itemProps={item}
                onPlayTimer={onPlayTimer}
                onPauseTimer={onPauseTimer}
              />
            )}
          </li>
        )
      }
      return listItem
    })
    return <ul className="todo-list">{completedItems}</ul>
  }
}

TaskList.defaultProps = {
  onDeleteClicked: () => {
    throw new Error('onDeleteClicked property is undefined! Check it!')
  },
  onEditFinished: () => {
    throw new Error('onEditFinished property is undefined! Check it!')
  },
  onTaskClicked: () => {
    throw new Error('onTaskClicked property is undefined! Check it!')
  },
  editTaskHandler: () => {
    throw new Error('editTaskHandler property is undefined! Check it!')
  },
  onTimerIteration: () => {
    throw new Error('onTimerIteration property is undefined! Check it!')
  },
}

TaskList.propTypes = {
  onDeleteClicked: PropTypes.func,
  onEditFinished: PropTypes.func,
  onTaskClicked: PropTypes.func,
  editTaskHandler: PropTypes.func,
  onTimerIteration: PropTypes.func,
  todoListItems: PropTypes.array.isRequired,
  curFilter: PropTypes.string.isRequired,
}
export default TaskList
