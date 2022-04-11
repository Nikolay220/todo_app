import React from "react";
import "./tasks-filter.css";

const TasksFilter = ({filterProps, filterBtnHandler}) => {
    if(filterProps.selected)
        return <button onClick={()=>{filterBtnHandler(filterProps.id)}} className="selected">{filterProps.content}</button>;
    else
        return <button onClick={()=>{filterBtnHandler(filterProps.id)}}>{filterProps.content}</button>;
}

TasksFilter.defaultProps={
    filterBtnHandler:()=>{throw new Error("filterBtnHandler property is undefined! Check it!")},
    filterProps:{ id:"-1", selected: false, content: "undefined" }
}

export default TasksFilter;