import React from "react";
import Footer from "../footer/footer";
import TaskList from "../task-list";
import NewTaskForm from "../new-task-form";

const App = () => {
  var today = new Date();
  const todoListItems = [
    {
      id: "q1",
      status: "completed",
      description: "Completed task",
      created: new Date(Date.now() - 14000),
    },
    {
      id: "q2",
      status: "editing",
      description: "Editing task",
      created: new Date(Date.now()),
    },
    {
      id: "q3",
      status: "",
      description: "Active task",
      created: new Date(Date.now() - 300000),
    },
  ];

  const filterListItems = [
    { id: "q1", selected: true, content: "All" },
    { id: "q2", selected: false, content: "Active" },
    { id: "q3", selected: false, content: "Completed" },
  ];
  return (
    <section className="todoapp">
      <header className="header">
        <h1>todos</h1>
        <NewTaskForm />
      </header>
      <section className="main">
        <TaskList todoListItems={todoListItems} />
        <Footer filterListItems={filterListItems} />
      </section>
    </section>
  );
};

export default App;
