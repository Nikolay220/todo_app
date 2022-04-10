import React from "react";
import "./tasks-filter.css";

const TasksFilter = ({itemProps, filterBtnHandler}) => {
    if(itemProps.selected)
        return <button onClick={()=>{filterBtnHandler(itemProps.id)}} className="selected">{itemProps.content}</button>;
    else
        return <button onClick={()=>{filterBtnHandler(itemProps.id)}}>{itemProps.content}</button>;
}

export default TasksFilter;