import React from "react";
import "./tasks-filter.css";

const TasksFilter = ({itemProps}) => {
    if(itemProps.selected)
        return <button className="selected">{itemProps.content}</button>;
    else
        return <button>{itemProps.content}</button>;
}

export default TasksFilter;