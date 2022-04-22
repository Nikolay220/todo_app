import React from 'react'

import Footer from '../Footer'
import TaskList from '../TaskList'
import NewTaskBar from '../NewTaskBar'

import './App.scss'

let taskId = 1

function createNewListItem(
  id,
  description,
  status,
  statusBeforeEditing = '',
  minutes = 12,
  seconds = 25,
  timeIsOver = false
) {
  return {
    id,
    status,
    statusBeforeEditing,
    description,
    created: new Date(Date.now()),
    updatedAt: new Date(Date.now()),
    minutes,
    seconds,
    timeIsOver,
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
        createNewListItem(taskId++, 'completed', 'completed', 'completed'),
        createNewListItem(taskId++, 'edit', 'editing'),
        createNewListItem(taskId++, 'active', ''),
      ],
      curFilter: 'All',
    }

    this.taskClickedHandler = (id) => {
      this.setState((state) => {
        const clickedTaskIndex = state.todoListItems.findIndex((value) => value.id === id)
        let newArr = state.todoListItems.map((value) => {
          return { ...value }
        })
        newArr[clickedTaskIndex].status = newArr[clickedTaskIndex].status === '' ? 'completed' : ''
        newArr[clickedTaskIndex].statusBeforeEditing = newArr[clickedTaskIndex].status
        return { todoListItems: newArr }
      })
    }

    this.filterBtnHandler = (choosedFilter) => {
      this.setState({ curFilter: choosedFilter })
    }

    this.closeBtnHandler = (id) => {
      this.setState((state) => {
        let newArr = state.todoListItems.map((value) => {
          return { ...value }
        })
        newArr = newArr.filter((value) => {
          return value.id !== id
        })
        newArr.forEach((value) => {
          value.updatedAt = new Date(Date.now())
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
          return value.status !== 'completed'
        })
        newArr.forEach((value) => {
          value.updatedAt = new Date(Date.now())
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
        let newItem = createNewListItem(taskId++, taskObj.task, '', '', mins, secs)
        this.setState((state) => {
          let newArr = state.todoListItems.map((value) => {
            return { ...value }
          })
          newArr.push(newItem)
          let choosedFilterContent = this.state.curFilter
          if (choosedFilterContent === 'Completed') choosedFilterContent = 'All'
          newArr.forEach((value) => {
            value.updatedAt = new Date(Date.now())
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
        newArr[index].status = 'editing'
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
            value.updatedAt = new Date(Date.now())
          })
          return { todoListItems: newArr }
        })
      }
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
  }

  render() {
    return (
      <section className="todoapp">
        <header className="header">
          <h1>todos</h1>
          <NewTaskBar onAddTask={this.addTaskHandler} />
        </header>
        <section className="main">
          <TaskList
            onCloseBtnClicked={this.closeBtnHandler}
            onTaskClicked={this.taskClickedHandler}
            todoListItems={this.state.todoListItems}
            editTaskHandler={this.editTaskHandler}
            onEditFinished={this.onTaskEditFinished}
            curFilter={this.state.curFilter}
            onTimerIteration={this.decrementSecTimer}
          />
          <Footer
            activeItems={getNumOfActiveTasks(this.state.todoListItems)}
            clearCompletedTasksHandler={this.clearCompletedTasksHandler}
            filterBtnHandler={this.filterBtnHandler}
            curFilter={this.state.curFilter}
          />
        </section>
      </section>
    )
  }
}

export default App
