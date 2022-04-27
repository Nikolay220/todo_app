import React from 'react'
import PropTypes from 'prop-types'

import Task from '../Task'

import './TaskList.scss'
function taskIsDisplayed(taskContent, curFilter) {
  if (curFilter === 'All') return true
  else if (curFilter === 'Active' && taskContent.statusBeforeEditing === '') return true
  else if (curFilter === 'Completed' && taskContent.statusBeforeEditing === 'completed') return true
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
      onCloseBtnClicked,
      curFilter,
      onPlayTimer,
      onPauseTimer,
    } = this.props
    const completedItems = todoListItems.map((item) => {
      let listItem
      if (item.status) {
        listItem = (
          <li className={item.status} key={item.id}>
            {taskIsDisplayed(item, curFilter) && (
              <Task
                editTaskHandler={editTaskHandler}
                onCloseBtnClicked={onCloseBtnClicked}
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
            {taskIsDisplayed(item, curFilter) && (
              <Task
                editTaskHandler={editTaskHandler}
                onCloseBtnClicked={onCloseBtnClicked}
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
  onCloseBtnClicked: () => {
    throw new Error('onCloseBtnClicked property is undefined! Check it!')
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
  onCloseBtnClicked: PropTypes.func,
  onEditFinished: PropTypes.func,
  onTaskClicked: PropTypes.func,
  editTaskHandler: PropTypes.func,
  onTimerIteration: PropTypes.func,
  todoListItems: PropTypes.array.isRequired,
  curFilter: PropTypes.string.isRequired,
}
export default TaskList
