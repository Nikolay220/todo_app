import React from "react";
import PropTypes from "prop-types";

import "./new-task-form.css";

class NewTaskForm extends React.Component {
  static defaultProps = {
    onFormSubmit: () => {
      throw new Error("onFormSubmit property is undefined! Check it!");
    },
  };

  static propTypes = {
    onFormSubmit: PropTypes.func,
  };

  state = { curVal: "" };
  inputChangeHandler = (evt) => {
    this.setState({ curVal: evt.target.value });
  };
  onSubmit = (evt) => {
    evt.preventDefault();
    this.props.onFormSubmit(this.state.curVal);
    this.setState({ curVal: "" });
  };
  render() {
    return (
      <form onSubmit={this.onSubmit}>
        <input
          className="new-todo"
          placeholder="What needs to be done?"
          value={this.state.curVal}
          onChange={this.inputChangeHandler}
          autoFocus
        />
      </form>
    );
  }
}

export default NewTaskForm;
