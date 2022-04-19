import React from 'react'

import Footer from '../footer/footer'
import TaskList from '../task-list'
import NewTaskBar from '../new-task-bar'

import './app.css'

let taskId = 1

// массив allTasks отражает актуальное содержание списка задач,
// возник, потому что появились фильтры,
// надо где-то хранить весь массив, чтобы вернуться к нему
// после возвращения от фильтра Active или Completed
// к фильтру All

let allTasks = [
  createNewListItem(taskId++, 'Completed task', 'completed', 'completed'),
  createNewListItem(taskId++, 'Editing task', 'editing'),
  createNewListItem(taskId++, 'Active task', ''),
]

// let filters = [
//   { id: 'q1', selected: true, content: 'All' },
//   { id: 'q2', selected: false, content: 'Active' },
//   { id: 'q3', selected: false, content: 'Completed' },
// ]

function createNewListItem(id, description, status, statusBeforeEditing = '') {
  return {
    id,
    status,
    description,
    created: new Date(Date.now()),
    statusBeforeEditing,
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
function getObjsArrayIndexById(objsArr, id) {
  return objsArr.findIndex((value) => {
    return value.id === id
  })
}

class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      todoListItems: [...allTasks],
      curFilter: 'All',
    }
    // Callback functions  на основе не предыдущего state, а переменной,
    // содержащей массив из state.
    this.taskClickedHandler = (id) => {
      const clickedTaskIndex = allTasks.findIndex((value) => value.id === id)
      allTasks[clickedTaskIndex].status = allTasks[clickedTaskIndex].status === '' ? 'completed' : ''
      allTasks[clickedTaskIndex].statusBeforeEditing = allTasks[clickedTaskIndex].status
      this.updateTasks()
    }

    this.filterBtnHandler = (choosedFilter) => {
      let tasks
      tasks = this.filterList(choosedFilter)
      this.setState({ curFilter: choosedFilter, todoListItems: tasks })
    }

    this.closeBtnHandler = (id) => {
      allTasks = allTasks.filter((value) => {
        return value.id !== id
      })
      this.updateTasks()
    }

    this.clearCompletedTasksHandler = () => {
      allTasks = allTasks.filter((value) => {
        return value.status !== 'completed'
      })
      this.updateTasks()
    }

    this.addTaskHandler = (text) => {
      // console.log(text)
      if (text.trim()) {
        let newItem = createNewListItem(taskId++, text, '')
        allTasks.push(newItem)
        let choosedFilterContent = this.state.curFilter
        if (choosedFilterContent === 'Completed') {
          // this.chooseOtherFilter('All') //choose other filter by program
          choosedFilterContent = 'All'
        }
        this.setState({
          todoListItems: this.filterList(choosedFilterContent),
          curFilter: choosedFilterContent,
        })
      }
    }

    this.editTaskHandler = (taskId) => {
      let index = getObjsArrayIndexById(allTasks, taskId)
      allTasks[index].statusBeforeEditing = allTasks[index].status
      allTasks[index].status = 'editing'
      this.setState({ todoListItems: allTasks })
    }

    this.onTaskEditFinished = (taskId, newText) => {
      if (newText.trim()) {
        let index = getObjsArrayIndexById(allTasks, taskId)
        allTasks[index].status = allTasks[index].statusBeforeEditing
        allTasks[index].description = newText
        this.setState({ todoListItems: allTasks })
      }
    }
  }

  // при работе фильтров allTasks не изменяется
  // возвращает массив задач в зависимости от фильтра
  filterList(content) {
    if (content === 'All') {
      return allTasks
    } else if (content === 'Active') {
      return allTasks.filter((value) => value.status === '')
    } else if (content === 'Completed') {
      return allTasks.filter((value) => value.status === 'completed')
    }
  }

  getChoosedFilterContent() {
    let choosedFilterIndex = this.state.filterListItems.findIndex((value) => value.selected)
    return this.state.filterListItems[choosedFilterIndex].content
  }

  // chooseOtherFilter(content) {
  //   for (let val of filters) {
  //     if (val.selected === true) val.selected = false
  //     if (val.content === content) val.selected = true
  //   }
  // }

  // chooseOtherFilterById(id) {
  //   let filterIndex = -1
  //   filters.forEach((value, index) => {
  //     if (value.selected === true) value.selected = false
  //     if (value.id === id) {
  //       value.selected = true
  //       filterIndex = index
  //     }
  //   })
  //   return filterIndex
  // }

  updateTasks() {
    let filterContent = this.state.curFilter
    this.setState({ todoListItems: this.filterList(filterContent) })
  }

  isTaskCompleted(id) {
    let index = allTasks.findIndex((value) => {
      return value.id === id
    })
    if (index >= 0) {
      if (allTasks[index].status === 'completed') {
        return true
      }
    }
    return false
  }

  render() {
    return (
      <section className="todoapp">
        <header className="header">
          <h1>todos</h1>
          <NewTaskBar onFormSubmit={this.addTaskHandler} />
        </header>
        <section className="main">
          <TaskList
            onCloseBtnClicked={this.closeBtnHandler}
            onTaskClicked={this.taskClickedHandler}
            todoListItems={this.state.todoListItems}
            editTaskHandler={this.editTaskHandler}
            onEditFinished={this.onTaskEditFinished}
          />
          <Footer
            activeItems={getNumOfActiveTasks(allTasks)}
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
