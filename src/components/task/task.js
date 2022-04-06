import React from "react";
import { formatDistanceToNow } from "date-fns";
// function onChangeHandler(event){
//     event.target.value = event.target.value;
// };
import "./task.css";

class Task extends React.Component {
  constructor(props) {
    super(props);
    this.state = { value: "Editing task" };
    this.onChangeHandler = this.onChangeHandler.bind(this);
  }
  onChangeHandler(event) {
    this.setState({ value: event.target.value });
  }
  render() {
    const { id, status, description, created } = this.props.itemProps;
    const { onTaskClicked, onCloseBtnClicked } = this.props;
    // let input;
    // if (status) {
    //   input = (
    //     <input
    //       onChange={onTaskClicked.bind(this, id)}
    //       className="toggle"
    //       type="checkbox"
    //       checked
    //     />
    //   );
    // } else {
    //   input = (
    //     <input
    //       onChange={onTaskClicked.bind(this, id)}
    //       className="toggle"
    //       type="checkbox"
    //     />
    //   );
    // }
    
    return (
      <div>
        <div className="view">
          <input
            // onChange={onTaskClicked.bind(this, id)}
            className="toggle"
            type="checkbox"
          />
          <label onClick={onTaskClicked.bind(this, id)}>
            <span className="description">{description}</span>
            <span className="created">
              {formatDistanceToNow(created, { includeSeconds: true })}
            </span>
          </label>
          <button className="icon icon-edit"></button>
          <button onClick={onCloseBtnClicked.bind(this,id)} className="icon icon-destroy"></button>
        </div>
        {status === "editing" && (
          <input
            type="text"
            className="edit"
            value={this.state.value}
            onChange={this.onChangeHandler}
          ></input>
        )}
      </div>
    );
  }
}

export default Task;
