import React from "react";
import Footer from "../footer/footer";
import TaskList from "../task-list";
import NewTaskBar from "../new-task-bar";
import PropTypes from "prop-types";

import "./app.css";

let taskId = 4;


function createNewListItem(id, description, status, statusBeforeEditing = "") {
  return {
    id,
    status,
    description,
    created: new Date(Date.now()),
    statusBeforeEditing,
  };
}
function getNumOfActiveTasks(arrayOfTasks) {
  const number = arrayOfTasks.reduce((acc, curVal) => {
    if (!curVal.statusBeforeEditing) {
      return ++acc;
    }
    return acc;
  }, 0);
  return number;
}
function getObjsArrayIndexById(objsArr, id) {
  return objsArr.findIndex((value) => {
    return value.id === id;
  });
}

class App extends React.Component {
  static propTypes = {
    allTasks: PropTypes.arrayOf(PropTypes.object).isRequired,
    filters: PropTypes.arrayOf(PropTypes.object).isRequired,
  };
  constructor(props) {
    super(props);
    this.state = {
      todoListItems: [...props.allTasks],
      filterListItems: [...props.filters],
    };
    this.allTasks = [...props.allTasks];
    this.filters = [...props.filters];
  }

  // при работе фильтров allTasks не изменяется
  // возвращает массив задач в зависимости от фильтра
  filterList(content) {
    if (content === "All") {
      return this.allTasks;
    } else if (content === "Active") {
      return this.allTasks.filter((value) => value.status === "");
    } else if (content === "Completed") {
      return this.allTasks.filter((value) => value.status === "completed");
    }
  }

  getChoosedFilterContent() {
    let choosedFilterIndex = this.state.filterListItems.findIndex(
      (value) => value.selected
    );
    return this.state.filterListItems[choosedFilterIndex].content;
  }

  chooseOtherFilter(content) {
    for (let val of this.filters) {
      if (val.selected === true) val.selected = false;
      if (val.content === content) val.selected = true;
    }
  }

  chooseOtherFilterById(id) {
    let filterIndex=-1;
    this.filters.forEach((value,index)=>{
      if (value.selected === true) value.selected = false;
      if (value.id === id) {
        value.selected = true;
        filterIndex=index;
      }      
    })
    return filterIndex;
  }
  
  updateTasks() {
    let filterContent = this.getChoosedFilterContent();
    this.setState({ todoListItems: this.filterList(filterContent) });
  }

  isTaskCompleted(id) {
    let index = this.allTasks.findIndex((value) => {
      return value.id === id;
    });
    if (index >= 0) {
      if (this.allTasks[index].status === "completed") {
        return true;
      }
    }
    return false;
  }

  // Callback functions  на основе не предыдущего state, а переменной,
  // содержащей массив из state.
  taskClickedHandler = (id) => {
    const clickedTaskIndex = this.allTasks.findIndex((value) => value.id === id);
    this.allTasks[clickedTaskIndex].status =
      this.allTasks[clickedTaskIndex].status === "" ? "completed" : "";
    this.allTasks[clickedTaskIndex].statusBeforeEditing =
      this.allTasks[clickedTaskIndex].status;
    this.updateTasks();
  };

  filterBtnHandler = (id) => {
    let tasks;
    let filterIndex = this.chooseOtherFilterById(id);
    tasks = this.filterList(this.filters[filterIndex].content);
    this.setState({ filterListItems: this.filters, todoListItems: tasks });
  };

  closeBtnHandler = (id) => {
    this.allTasks = this.allTasks.filter((value) => {
      return value.id !== id;
    });
    this.updateTasks();
  };

  clearCompletedTasksHandler = () => {
    this.allTasks = this.allTasks.filter((value) => {
      return value.status !== "completed";
    });
    this.updateTasks();
  };

  addTaskHandler = (text) => {
    let newItem = createNewListItem(taskId++, text, "");
    this.allTasks.push(newItem);
    let choosedFilterContent = this.getChoosedFilterContent();
    if (choosedFilterContent === "Completed") {
      this.chooseOtherFilter("All");
      choosedFilterContent = "All";
    }
    this.setState({
      todoListItems: this.filterList(choosedFilterContent),
    });
  };

  editTaskHandler = (taskId) => {
    let index = getObjsArrayIndexById(this.allTasks, taskId);
    this.allTasks[index].statusBeforeEditing = this.allTasks[index].status;
    this.allTasks[index].status = "editing";
    this.setState({ todoListItems: this.allTasks });
  };

  onTaskEditFinished = (taskId, newText) => {
    let index = getObjsArrayIndexById(this.allTasks, taskId);
    this.allTasks[index].status = this.allTasks[index].statusBeforeEditing;
    this.allTasks[index].description = newText;
    this.setState({ todoListItems: this.allTasks });
  };
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
            activeItems={getNumOfActiveTasks(this.allTasks)}
            clearCompletedTasksHandler={this.clearCompletedTasksHandler}
            filterBtnHandler={this.filterBtnHandler}
            filterListItems={this.state.filterListItems}
          />
        </section>
      </section>
    );
  }
}

export default App;
