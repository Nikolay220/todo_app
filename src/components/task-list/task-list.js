import React from "react";
import Task from "../task";

const TaskList = ({ todoListItems } = {}) => {
  
  const completedItems = todoListItems.map((item) => {
    let listItem;
    if(item.status){
      listItem = (
        <li className={item.status} key={item.id}>
          <Task itemProps={item} />
        </li>
      );
    }else{
      listItem = (
        <li key={item.id}>
          <Task itemProps={item} />
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
