import React from 'react'
import { v4 as uuidv4 } from 'uuid'

import LocalStorageService from '../../services/LocalStorageService'
import Footer from '../Footer'
import TaskList from '../TaskList'
import NewTaskBar from '../NewTaskBar'
import ACTIONS from '../../actions'
import FILTERS from '../../filters'
import './App.scss'

const { EMPTY, EDITING, COMPLETED } = ACTIONS
const { ALL, COMPLETED: COMPLETED_FILTER } = FILTERS

function createNewListItem(
  id,
  description,
  status,
  statusBeforeEditing = EMPTY,
  minutes = 12,
  seconds = 25,
  timeIsOver = false,
  timerId = null
) {
  return {
    id,
    status,
    statusBeforeEditing,
    description,
    created: Date.now(),
    updatedAt: Date.now(),
    minutes,
    seconds,
    timeIsOver,
    timerId,
  }
}
function getNumOfActiveTasks(arrayOfTasks) {
  const number = arrayOfTasks.reduce((acc, curVal) => {
    if (!curVal.statusBeforeEditing) {
      return ++acc
    }
    return acc
  }, 0)
  return number
}
function getIndexById(objsArr, id) {
  return objsArr.findIndex((value) => {
    return value.id === id
  })
}

class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      todoListItems: [
        createNewListItem(uuidv4(), 'Completed task', COMPLETED, COMPLETED),
        createNewListItem(uuidv4(), 'Editing task', EDITING),
        createNewListItem(uuidv4(), 'Active task', EMPTY),
      ],
      curFilter: ALL,
    }
    this.decrementSecTimer = (id) => {
      this.setState((state) => {
        let index = getIndexById(state.todoListItems, id)
        let newArr = state.todoListItems.map((value) => {
          return { ...value }
        })
        if (newArr[index].seconds) {
          --newArr[index].seconds
        } else if (newArr[index].minutes) {
          --newArr[index].minutes
          newArr[index].seconds = 59
        } else {
          newArr[index].timeIsOver = true
        }
        return { todoListItems: newArr }
      })
    }
    this.addTimer = (id) => {
      const clickedTaskIndex = this.state.todoListItems.findIndex((value) => value.id === id)
      if (!this.state.todoListItems[clickedTaskIndex].timerId && !this.state.todoListItems[clickedTaskIndex].timeIsOver)
        this.setState((state) => {
          let newArr = state.todoListItems.map((value) => {
            return { ...value }
          })
          newArr[clickedTaskIndex].timerId = setInterval(() => {
            this.decrementSecTimer(id)
          }, 1000)
          return { todoListItems: newArr }
        })
    }
    this.removeTimer = (id) => {
      const clickedTaskIndex = this.state.todoListItems.findIndex((value) => value.id === id)
      if (this.state.todoListItems[clickedTaskIndex].timerId) {
        this.setState((state) => {
          let newArr = state.todoListItems.map((value) => {
            return { ...value }
          })
          clearInterval(newArr[clickedTaskIndex].timerId)
          newArr[clickedTaskIndex].timerId = null
          return { todoListItems: newArr }
        })
      }
    }
    this.taskClickedHandler = (id) => {
      this.setState((state) => {
        const clickedTaskIndex = state.todoListItems.findIndex((value) => value.id === id)
        let newArr = state.todoListItems.map((value) => {
          return { ...value }
        })
        newArr[clickedTaskIndex].status = newArr[clickedTaskIndex].status === EMPTY ? COMPLETED : EMPTY
        newArr[clickedTaskIndex].statusBeforeEditing = newArr[clickedTaskIndex].status
        return { todoListItems: newArr }
      })
    }

    this.filterHandler = (choosedFilter) => {
      this.setState({ curFilter: choosedFilter })
    }

    this.deleteHandler = (id) => {
      this.setState((state) => {
        let newArr = state.todoListItems.map((value) => {
          return { ...value }
        })
        newArr = newArr.filter((value) => {
          if (value.id === id && value.timerId) clearInterval(value.timerId)
          return value.id !== id
        })
        newArr.forEach((value) => {
          value.updatedAt = Date.now()
        })
        return { todoListItems: newArr }
      })
    }

    this.clearCompletedTasksHandler = () => {
      this.setState((state) => {
        let newArr = state.todoListItems.map((value) => {
          return { ...value }
        })
        newArr = newArr.filter((value) => {
          if (value.status === COMPLETED && value.timerId) clearInterval(value.timerId)
          return value.status !== COMPLETED
        })
        newArr.forEach((value) => {
          value.updatedAt = Date.now()
        })
        return { todoListItems: newArr }
      })
    }

    this.addTaskHandler = (taskObj) => {
      if (taskObj.task.trim()) {
        let mins = undefined
        let secs = undefined
        if (taskObj.minutes.trim()) {
          mins = Number(taskObj.minutes.trim())
          mins = Number.isNaN(mins) || mins < 0 ? undefined : mins
        }
        if (taskObj.seconds.trim()) {
          secs = Number(taskObj.seconds.trim())
          secs = Number.isNaN(secs) || secs < 0 ? undefined : secs
        }
        let newItem = createNewListItem(uuidv4(), taskObj.task, EMPTY, EMPTY, mins, secs)
        this.setState((state) => {
          let newArr = state.todoListItems.map((value) => {
            return { ...value }
          })
          newArr.push(newItem)
          let choosedFilterContent = this.state.curFilter
          if (choosedFilterContent === COMPLETED_FILTER) choosedFilterContent = ALL
          newArr.forEach((value) => {
            value.updatedAt = Date.now()
          })
          return {
            todoListItems: newArr,
            curFilter: choosedFilterContent,
          }
        })
      }
    }

    this.editTaskHandler = (taskId) => {
      this.setState((state) => {
        let newArr = state.todoListItems.map((value) => {
          return { ...value }
        })
        let index = getIndexById(newArr, taskId)
        newArr[index].statusBeforeEditing = newArr[index].status
        newArr[index].status = EDITING
        return { todoListItems: newArr }
      })
    }

    this.onTaskEditFinished = (taskId, newText) => {
      if (newText.trim()) {
        this.setState((state) => {
          let index = getIndexById(state.todoListItems, taskId)
          let newArr = state.todoListItems.map((value) => {
            return { ...value }
          })
          newArr[index].status = newArr[index].statusBeforeEditing
          newArr[index].description = newText
          newArr.forEach((value) => {
            value.updatedAt = Date.now()
          })
          return { todoListItems: newArr }
        })
      }
    }
  }
  componentDidMount() {
    window.onbeforeunload = () => {
      LocalStorageService.setTodos(JSON.stringify(this.state.todoListItems))
    }
    let savedTodos = JSON.parse(LocalStorageService.getTodos())
    if (savedTodos) {
      this.setState({ todoListItems: savedTodos })
    }
  }
  render() {
    return (
      <section className="todoapp">
        <header className="header">
          <h1>todos</h1>
          <NewTaskBar onAddTask={this.addTaskHandler} />
        </header>
        <section className="main">
          {!this.state.todoListItems.length && <p className="main__empty-list-message">Todo list is empty</p>}
          <TaskList
            onDeleteClicked={this.deleteHandler}
            onTaskClicked={this.taskClickedHandler}
            todoListItems={this.state.todoListItems}
            editTaskHandler={this.editTaskHandler}
            onEditFinished={this.onTaskEditFinished}
            curFilter={this.state.curFilter}
            onPlayTimer={this.addTimer}
            onPauseTimer={this.removeTimer}
          />
          <Footer
            activeItems={getNumOfActiveTasks(this.state.todoListItems)}
            clearCompletedTasksHandler={this.clearCompletedTasksHandler}
            filterHandler={this.filterHandler}
            curFilter={this.state.curFilter}
          />
        </section>
      </section>
    )
  }
}

export default App
