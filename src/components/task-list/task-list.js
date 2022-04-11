import React from "react";
import Task from "../task";
import "./task-list.css";

const TaskList = ({ onEditFinished, 
                    editTaskHandler, 
                    todoListItems, 
                    onTaskClicked, 
                    onCloseBtnClicked } = {}) => {
  
  const completedItems = todoListItems.map((item) => {
    let listItem;
    if(item.status){
      listItem = (
        <li className={item.status} key={item.id}>
          <Task editTaskHandler={editTaskHandler}
                onCloseBtnClicked={onCloseBtnClicked}
                onTaskClicked={onTaskClicked} 
                onEditFinished = {onEditFinished}
                itemProps={item} />
        </li>
      );
    }else{
      listItem = (
        <li key={item.id}>
          <Task editTaskHandler={editTaskHandler}
                onCloseBtnClicked={onCloseBtnClicked}
                onTaskClicked={onTaskClicked}
                onEditFinished = {onEditFinished}
                itemProps={item} />
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
