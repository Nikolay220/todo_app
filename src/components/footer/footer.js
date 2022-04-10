import React from "react";
import TasksFilter from "../tasks-filter";
import "./footer.css";

const Footer = ({clearCompletedTasksHandler, filterListItems, filterBtnHandler, activeItems})=>{
    const filters = filterListItems.map((item)=>{
        let {...itemProps}={...item};
        return (
            <li key={itemProps.id}>
                <TasksFilter filterBtnHandler={filterBtnHandler} itemProps={itemProps}/>                
            </li>
        )   
    });
    return(
        <footer className="footer">
            <span className="todo-count">{activeItems} items left</span>
            <ul className="filters">
                {filters}
            </ul>
            <button onClick={clearCompletedTasksHandler} className="clear-completed">Clear completed</button>
        </footer>
    );
}

export default Footer;