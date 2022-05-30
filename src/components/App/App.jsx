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

function createNewListItem(id, description, status, statusBeforeEditing = EMPTY) {
  return {
    id,
    status,
    statusBeforeEditing,
    description,
    created: Date.now(),
    updatedAt: Date.now(),
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

    this.taskClickedHandler = (id) => {
      this.setState((state) => {
        const clickedTaskIndex = state.todoListItems.findIndex((value) => value.id === id)
        const newArr = state.todoListItems.map((val) => ({ ...val }))
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
        let newArr = state.todoListItems.filter((value) => {
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
        let newArr = state.todoListItems.filter((value) => {
          return value.status !== COMPLETED
        })
        newArr.forEach((value) => {
          value.updatedAt = Date.now()
        })
        return { todoListItems: newArr }
      })
    }

    this.addTaskHandler = (text) => {
      if (text.trim()) {
        let newItem = createNewListItem(uuidv4(), text, EMPTY)
        this.setState((state) => {
          let newArr = state.todoListItems.map((val) => ({ ...val }))
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
        let newArr = state.todoListItems.map((val) => ({ ...val }))
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
          let newArr = state.todoListItems.map((val) => ({ ...val }))
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
          <NewTaskBar onFormSubmit={this.addTaskHandler} />
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
