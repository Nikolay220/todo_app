import React from "react";
import { formatDistanceToNow } from "date-fns";
// function onEditChangeHandler(event){
//     event.target.value = event.target.value;
// };
import "./task.css";

class Task extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      value: props.itemProps.description,
    };
    this.onEditChangeHandler = this.onEditChangeHandler.bind(this);
  }
  onEditChangeHandler(event) {
    this.setState({ value: event.target.value });
  }
  render() {
    const { id, status, description, created } = this.props.itemProps;
    const {
      onEditFinished,
      onTaskClicked,
      onCloseBtnClicked,
      editTaskHandler,
    } = this.props;
    return (
      <div>
        <div className="view">
          <input
            onChange={() => onTaskClicked(id)}
            className="toggle"
            type="checkbox"
            checked={status === "completed" ? true : false}
          />
          <label onClick={() => onTaskClicked(id)}>
            <span className="description">{description}</span>
            <span className="created">
              {formatDistanceToNow(created, { includeSeconds: true })}
            </span>
          </label>
          <button
            onClick={() => editTaskHandler(id)}
            className="icon icon-edit"
          ></button>
          <button
            onClick={onCloseBtnClicked.bind(this, id)}
            className="icon icon-destroy"
          ></button>
        </div>
        {status === "editing" && (
          <input
            type="text"
            className="edit"
            value={this.state.value}
            onChange={this.onEditChangeHandler}
            onKeyDown={(evt) => {              
              if (evt.key === "Enter")
                onEditFinished(id, evt.target.value);
            }}
          ></input>
        )}
      </div>
    );
  }
}

export default Task;
