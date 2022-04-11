import React from "react";
import Footer from "../footer/footer";
import TaskList from "../task-list";
import NewTaskBar from "../new-task-bar";
import "./app.css";

let taskId = 1;

// массив allTasks отражает актуальное содержание списка задач,
// возник, потому что появились фильтры,
// надо где-то хранить весь массив, чтобы вернуться к нему
// после возвращения от фильтра Active или Completed
// к фильтру All

let allTasks = [
  createNewListItem(taskId++,"Completed task","completed","completed"),
  createNewListItem(taskId++,"Editing task","editing"),
  createNewListItem(taskId++,"Active task","")
];

let defaultFilterList = [
  { id: "q1", selected: true, content: "All" },
  { id: "q2", selected: false, content: "Active" },
  { id: "q3", selected: false, content: "Completed" },
];

let filters = [
  { id: "q1", selected: true, content: "All" },
  { id: "q2", selected: false, content: "Active" },
  { id: "q3", selected: false, content: "Completed" },
];

function createNewListItem(id, description, status, statusBeforeEditing="") {
  return {
    id,
    status,
    description,
    created: new Date(Date.now()),
    statusBeforeEditing
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
  constructor(props) {
    super(props);
    this.state = {
      todoListItems: [...allTasks],
      filterListItems: [...filters],
      numOfActiveTasks: getNumOfActiveTasks(allTasks),
    };
  }

  // при работе фильтров allTasks не изменяется
  // возвращает массив задач в зависимости от фильтра
  filterList(content) {
    if (content === "All") {
      return allTasks;
    } else if (content === "Active") {
      return allTasks.filter((value) => value.status === "");
    } else if (content === "Completed") {
      return allTasks.filter((value) => value.status === "completed");
    }
  }

  getChoosedFilterContent() {
    let choosedFilterIndex = this.state.filterListItems.findIndex(
      (value) => value.selected
    );
    return this.state.filterListItems[choosedFilterIndex].content;
  }

  isTaskCompleted(id) {
    let index = allTasks.findIndex((value) => {
      return value.id === id;
    });
    if (index >= 0) {
      if (allTasks[index].status === "completed") {
        return true;
      }
    }
    return false;
  }

  // Callback functions  на основе не предыдущего state, а переменной,
  // содержащей массив из state.
  taskClickedHandler = (id) => {
    const clickedTaskIndex = allTasks.findIndex((value) => value.id === id);
    allTasks[clickedTaskIndex].status =
      allTasks[clickedTaskIndex].status === "" ? "completed" : "";
    this.setState((state) => {
      if (this.isTaskCompleted(id))
        return {
          todoListItems: allTasks,
          numOfActiveTasks: state.numOfActiveTasks - 1,
        };
      else
        return {
          todoListItems: allTasks,
          numOfActiveTasks: state.numOfActiveTasks + 1,
        };
    });
  };

  filterBtnHandler = (id) => {
    let tasks;
    const choosedIndex = filters.findIndex((value) => {
      return value.id === id;
    });
    const oldIndex = filters.findIndex((value) => {
      return value.selected;
    });
    // скрываем старый индекс
    filters[oldIndex].selected = false;
    // выбираем новый
    if (choosedIndex >= 0) {
      filters[choosedIndex].selected = true;
      tasks = this.filterList(filters[choosedIndex].content);
    }
    this.setState({ filterListItems: filters, todoListItems: tasks });
  };

  closeBtnHandler = (id) => {
    let taskCompleted = this.isTaskCompleted(id);
    allTasks = allTasks.filter((value) => {
      return value.id !== id;
    });
    this.setState((state) => {
      if (taskCompleted) return { todoListItems: allTasks };
      else
        return {
          todoListItems: allTasks,
          numOfActiveTasks: state.numOfActiveTasks - 1,
        };
    });
  };

  clearCompletedTasksHandler = () => {
    allTasks = allTasks.filter((value) => {
      return value.status !== "completed";
    });
    let filterContent = this.getChoosedFilterContent();
    this.setState({ todoListItems: this.filterList(filterContent) });
  };

  // может быть кейс,
  // когда выбран completed и по идее новый active не
  // должен отображаться при добавлении итема,
  // для этого случая я выбираю фильтр All при добавлении.
  addTaskHandler = (text) => {
    let newItem = createNewListItem(taskId++, text);
    allTasks.push(newItem);
    let choosedFilterIndex = this.state.filterListItems.findIndex(
      (value) => value.selected
    );
    let choosedFilterContent =
      this.state.filterListItems[choosedFilterIndex].content;
    if (choosedFilterContent === "Completed")
      this.setState((state) => {
        return {
          todoListItems: allTasks,
          filterListItems: defaultFilterList,
          numOfActiveTasks: state.numOfActiveTasks + 1,
        };
      });
    else
      this.setState((state) => {
        return {
          todoListItems: this.filterList(choosedFilterContent),
          numOfActiveTasks: state.numOfActiveTasks + 1,
        };
      });
  };

  editTaskHandler = (taskId) => {
    let index = getObjsArrayIndexById(allTasks, taskId);
    allTasks[index].statusBeforeEditing = allTasks[index].status;
    allTasks[index].status = "editing";
    this.setState({ todoListItems: allTasks });
  };

  onTaskEditFinished = (taskId, newText) => {
    let index = getObjsArrayIndexById(allTasks, taskId);
    allTasks[index].status = allTasks[index].statusBeforeEditing;
    allTasks[index].description = newText;
    this.setState({ todoListItems: allTasks });
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
            activeItems={this.state.numOfActiveTasks}
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
