import React from "react";
import TasksFilter from "../tasks-filter";
import "./footer.css";

const Footer = ({
  clearCompletedTasksHandler,
  filterListItems,
  filterBtnHandler,
  activeItems,
}) => {
  const filters = filterListItems.map((filter) => {
    let { ...filterProps } = { ...filter };
    return (
      <li key={filterProps.id}>
        <TasksFilter
          filterBtnHandler={filterBtnHandler}
          filterProps={filterProps}
        />
      </li>
    );
  });
  return (
    <footer className="footer">
      <span className="todo-count">{activeItems} items left</span>
      <ul className="filters">{filters}</ul>
      <button onClick={clearCompletedTasksHandler} className="clear-completed">
        Clear completed
      </button>
    </footer>
  );
};

Footer.defaultProps = {
  clearCompletedTasksHandler: () => {throw new Error("clearCompletedTasksHandler property is undefined! Check it!")},
  filterListItems: [],
  filterBtnHandler: () => {throw new Error("filterBtnHandler property is undefined! Check it!")},
  activeItems: 0,
};
export default Footer;
