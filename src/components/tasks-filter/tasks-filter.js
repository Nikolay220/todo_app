import React from "react";
import PropTypes from "prop-types";

import "./tasks-filter.css";

const TasksFilter = ({ filterProps, filterBtnHandler }) => {
  if (filterProps.selected)
    return (
      <button
        onClick={() => {
          filterBtnHandler(filterProps.id);
        }}
        className="selected"
      >
        {filterProps.content}
      </button>
    );
  else
    return (
      <button
        onClick={() => {
          filterBtnHandler(filterProps.id);
        }}
      >
        {filterProps.content}
      </button>
    );
};

TasksFilter.defaultProps = {
  filterBtnHandler: () => {
    throw new Error("filterBtnHandler property is undefined! Check it!");
  },
};

TasksFilter.propTypes = {
  filterBtnHandler: PropTypes.func,
  filterProps: PropTypes.object.isRequired,
};

export default TasksFilter;
