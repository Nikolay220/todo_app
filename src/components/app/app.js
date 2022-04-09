import React from "react";
import Footer from "../footer/footer";
import TaskList from "../task-list";
import NewTaskForm from "../new-task-form";
import "./app.css";

let id=1;

function createNewListItem(id, description){
    return  {
              id,
              status:"",
              description,
              created: new Date(Date.now())
            }
}
class App extends React.Component {
  constructor() {
    super();
    this.state = {
      todoListItems: [
        {
          id: id++,
          status: "completed",
          description: "Completed task",
          created: new Date(Date.now() - 14000),
        },
        {
          id: id++,
          status: "editing",
          description: "Editing task",
          created: new Date(Date.now()),
        },
        {
          id: id++,
          status: "",
          description: "Active task",
          created: new Date(Date.now() - 300000),
        },
      ],
    };
  }

  taskClickedHandler = (id) => {
    this.setState((state) => {
      const newArr = state.todoListItems.map((value) => {
        if (value.id === id) {
          const newStatus = value.status === "" ? "completed" : "";
          // const newDescription = value.description === "Active task" ? "Completed task" : "Active task";
          value = { ...value, status: newStatus};
          value.created = new Date(Date.now());
        }
        return value;
      });
      return { todoListItems: newArr };
    });
  };

  today = new Date();
  filterListItems = [
    { id: "q1", selected: true, content: "All" },
    { id: "q2", selected: false, content: "Active" },
    { id: "q3", selected: false, content: "Completed" },
  ];

  closeBtnHandler = (id) => {
    this.setState((state) => {
      const newArr = state.todoListItems.filter((value) => {
        return value.id !== id;
      });
      return { todoListItems: newArr };
    });
  };

  submitFormHandler = (text) =>{
    this.setState((state)=>{
      let newArr = [...state.todoListItems, 
                    createNewListItem(id++,text)];
      return { todoListItems: newArr };
    })
  }

  render() {
    return (
      <section className="todoapp">
        <header className="header">
          <h1>todos</h1>
          <NewTaskForm onFormSubmit={this.submitFormHandler}/>
        </header>
        <section className="main">
          <TaskList
            onCloseBtnClicked={this.closeBtnHandler}
            onTaskClicked={this.taskClickedHandler}
            todoListItems={this.state.todoListItems}
          />
          <Footer filterListItems={this.filterListItems} />
        </section>
      </section>
    );
  }
}


export default App;
