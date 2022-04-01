import React from "react";
import TasksFilter from "../tasks-filter";

const Footer = ({filterListItems})=>{
    const filters = filterListItems.map((item)=>{
        let {id,...itemProps}={...item};
        return (
            <li key={id}>
                <TasksFilter itemProps={itemProps}/>                
            </li>
        )   
    });
    return(
        <footer className="footer">
            <span className="todo-count">1 items left</span>
            <ul className="filters">
                {filters}
            </ul>
            <button className="clear-completed">Clear completed</button>
        </footer>
    );
}

export default Footer;