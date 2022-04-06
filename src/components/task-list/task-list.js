import React from "react";
import Task from "../task";
import "./task-list.css";

const TaskList = ({ todoListItems, onTaskClicked, onCloseBtnClicked } = {}) => {
  
  const completedItems = todoListItems.map((item) => {
    let listItem;
    if(item.status){
      listItem = (
        <li className={item.status} key={item.id}>
          <Task onCloseBtnClicked={onCloseBtnClicked} onTaskClicked={onTaskClicked} itemProps={item} />
        </li>
      );
    }else{
      listItem = (
        <li key={item.id}>
          <Task onCloseBtnClicked={onCloseBtnClicked} onTaskClicked={onTaskClicked} itemProps={item} />
        </li>  
      );
    }
    return listItem;
  });
  return (
    <ul className="todo-list">
      {completedItems}
    </ul>
  );
};

export default TaskList;
