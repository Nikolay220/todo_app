import React, { useState, useCallback, useEffect } from 'react'
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

const App = () => {
  const [state, setState] = useState({
    todoListItems: [
      createNewListItem(uuidv4(), 'Completed task', COMPLETED, COMPLETED),
      createNewListItem(uuidv4(), 'Editing task', EDITING),
      createNewListItem(uuidv4(), 'Active task', EMPTY),
    ],
    curFilter: ALL,
  })

  const taskClickedHandler = useCallback((id) => {
    setState((state) => {
      const clickedTaskIndex = state.todoListItems.findIndex((value) => value.id === id)
      let newArr = state.todoListItems.map((val) => ({ ...val }))
      newArr[clickedTaskIndex].status = newArr[clickedTaskIndex].status === EMPTY ? COMPLETED : EMPTY
      newArr[clickedTaskIndex].statusBeforeEditing = newArr[clickedTaskIndex].status
      return { todoListItems: newArr, curFilter: state.curFilter }
    })
  }, [])

  const filterHandler = useCallback((choosedFilter) => {
    setState((state) => ({
      todoListItems: state.todoListItems,
      curFilter: choosedFilter,
    }))
  }, [])

  const deleteHandler = useCallback((id) => {
    setState((state) => {
      let newArr = state.todoListItems.filter((value) => {
        return value.id !== id
      })
      newArr.forEach((value) => {
        value.updatedAt = Date.now()
      })
      return { todoListItems: newArr, curFilter: state.curFilter }
    })
  }, [])

  const clearCompletedTasksHandler = useCallback(() => {
    setState((state) => {
      let newArr = state.todoListItems.filter((value) => {
        return value.status !== COMPLETED
      })
      newArr.forEach((value) => {
        value.updatedAt = Date.now()
      })
      return { todoListItems: newArr, curFilter: state.curFilter }
    })
  }, [])

  const addTaskHandler = useCallback((text) => {
    if (text.trim()) {
      let newItem = createNewListItem(uuidv4(), text, EMPTY)
      setState((state) => {
        let newArr = state.todoListItems.map((val) => ({ ...val }))
        newArr.push(newItem)
        let choosedFilterContent = state.curFilter
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
  }, [])

  const editTaskHandler = useCallback((taskId) => {
    setState((state) => {
      let newArr = state.todoListItems.map((val) => ({ ...val }))
      let index = getIndexById(newArr, taskId)
      newArr[index].statusBeforeEditing = newArr[index].status
      newArr[index].status = EDITING
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
        let newArr = state.todoListItems.map((val) => ({ ...val }))
        newArr[index].status = newArr[index].statusBeforeEditing
        newArr[index].description = newText
        newArr.forEach((value) => {
          value.updatedAt = Date.now()
        })
        return { todoListItems: newArr, curFilter: state.curFilter }
      })
    }
  }, [])
  useEffect(() => {
    window.onbeforeunload = () => {
      LocalStorageService.setTodos(JSON.stringify(state.todoListItems))
    }
    let savedTodos = JSON.parse(LocalStorageService.getTodos())
    if (savedTodos) {
      setState((state) => {
        return { todoListItems: savedTodos, curFilter: state.curFilter }
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
        {!state.todoListItems.length && <p className="main__empty-list-message">Todo list is empty</p>}
        <TaskList
          onDeleteClicked={deleteHandler}
          onTaskClicked={taskClickedHandler}
          todoListItems={state.todoListItems}
          editTaskHandler={editTaskHandler}
          onEditFinished={onTaskEditFinished}
          curFilter={state.curFilter}
        />
        <Footer
          activeItems={getNumOfActiveTasks(state.todoListItems)}
          clearCompletedTasksHandler={clearCompletedTasksHandler}
          filterHandler={filterHandler}
          curFilter={state.curFilter}
        />
      </section>
    </section>
  )
}

export default App
