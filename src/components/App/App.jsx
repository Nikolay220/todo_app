import React, { useState, useCallback } from 'react'

import Footer from '../Footer'
import TaskList from '../TaskList'
import NewTaskBar from '../NewTaskBar'

import './App.scss'

let taskId = 1

function createNewListItem(id, description, status, statusBeforeEditing = '') {
  return {
    id,
    status,
    statusBeforeEditing,
    description,
    created: new Date(Date.now()),
    updatedAt: new Date(Date.now()),
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

const App = () => {
  const [state, setState] = useState({
    todoListItems: [
      createNewListItem(taskId++, 'Completed task', 'completed', 'completed'),
      createNewListItem(taskId++, 'Editing task', 'editing'),
      createNewListItem(taskId++, 'Active task', ''),
    ],
    curFilter: 'All',
  })

  const taskClickedHandler = useCallback((id) => {
    setState((state) => {
      const clickedTaskIndex = state.todoListItems.findIndex((value) => value.id === id)
      const newArr = [...state.todoListItems]
      newArr[clickedTaskIndex].status = newArr[clickedTaskIndex].status === '' ? 'completed' : ''
      newArr[clickedTaskIndex].statusBeforeEditing = newArr[clickedTaskIndex].status
      return { todoListItems: newArr, curFilter: state.curFilter }
    })
  }, [])

  const filterBtnHandler = useCallback((choosedFilter) => {
    setState((state) => ({
      todoListItems: state.todoListItems,
      curFilter: choosedFilter,
    }))
  }, [])

  const closeBtnHandler = useCallback((id) => {
    setState((state) => {
      let newArr = state.todoListItems.filter((value) => {
        return value.id !== id
      })
      newArr.forEach((value) => {
        value.updatedAt = new Date(Date.now())
      })
      return { todoListItems: newArr, curFilter: state.curFilter }
    })
  }, [])

  const clearCompletedTasksHandler = useCallback(() => {
    setState((state) => {
      let newArr = state.todoListItems.filter((value) => {
        return value.status !== 'completed'
      })
      newArr.forEach((value) => {
        value.updatedAt = new Date(Date.now())
      })
      return { todoListItems: newArr, curFilter: state.curFilter }
    })
  }, [])

  const addTaskHandler = useCallback((text) => {
    if (text.trim()) {
      let newItem = createNewListItem(taskId++, text, '')
      setState((state) => {
        let newArr = [...state.todoListItems]
        newArr.push(newItem)
        let choosedFilterContent = state.curFilter
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
  }, [])

  const editTaskHandler = useCallback((taskId) => {
    setState((state) => {
      let newArr = [...state.todoListItems]
      let index = getIndexById(newArr, taskId)
      newArr[index].statusBeforeEditing = newArr[index].status
      newArr[index].status = 'editing'
      return {
        todoListItems: newArr,
        curFilter: state.curFilter,
      }
    })
  }, [])

  const onTaskEditFinished = useCallback((taskId, newText) => {
    if (newText.trim()) {
      setState((state) => {
        let index = getIndexById(state.todoListItems, taskId)
        let newArr = [...state.todoListItems]
        newArr[index].status = newArr[index].statusBeforeEditing
        newArr[index].description = newText
        newArr.forEach((value) => {
          value.updatedAt = new Date(Date.now())
        })
        return { todoListItems: newArr, curFilter: state.curFilter }
      })
    }
  }, [])

  return (
    <section className="todoapp">
      <header className="header">
        <h1>todos</h1>
        <NewTaskBar onFormSubmit={addTaskHandler} />
      </header>
      <section className="main">
        <TaskList
          onCloseBtnClicked={closeBtnHandler}
          onTaskClicked={taskClickedHandler}
          todoListItems={state.todoListItems}
          editTaskHandler={editTaskHandler}
          onEditFinished={onTaskEditFinished}
          curFilter={state.curFilter}
        />
        <Footer
          activeItems={getNumOfActiveTasks(state.todoListItems)}
          clearCompletedTasksHandler={clearCompletedTasksHandler}
          filterBtnHandler={filterBtnHandler}
          curFilter={state.curFilter}
        />
      </section>
    </section>
  )
}

export default App
