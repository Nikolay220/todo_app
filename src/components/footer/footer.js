import React from "react";
import TasksFilter from "../tasks-filter";
import PropTypes from "prop-types";

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
  // не стал добавлять нефункциональным элементам
  // дефолтные значения, потому что это ненаглядно (ошибка
  // в месте причины не формируется), зато propTypes увидит,
  // что нет этого свойства и объяснит причину в Warningе.
  clearCompletedTasksHandler: () => {
    throw new Error(
      "clearCompletedTasksHandler property is undefined! Check it!"
    );
  },
  filterBtnHandler: () => {
    throw new Error("filterBtnHandler property is undefined! Check it!");
  },
};
Footer.propTypes = {
  clearCompletedTasksHandler: PropTypes.func,
  filterListItems: PropTypes.array.isRequired,
  filterBtnHandler: PropTypes.func,
  activeItems: PropTypes.number.isRequired,
};
export default Footer;
