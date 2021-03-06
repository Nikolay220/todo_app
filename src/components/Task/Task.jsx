import React from 'react'
import { formatDistanceStrict } from 'date-fns'
import PropTypes from 'prop-types'

import ACTIONS from '../../actions'
import './Task.scss'
const { EDITING, COMPLETED } = ACTIONS
class Task extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      value: props.itemProps.description,
    }
    this.onEditChangeHandler = this.onEditChangeHandler.bind(this)
  }
  onEditChangeHandler(event) {
    this.setState({ value: event.target.value })
  }
  render() {
    const { id, status, description, created, updatedAt } = this.props.itemProps
    const { onEditFinished, onTaskClicked, onDeleteClicked, editTaskHandler } = this.props
    return (
      <div>
        <div className="view">
          <input
            onChange={() => onTaskClicked(id)}
            className="toggle"
            type="checkbox"
            checked={status === COMPLETED ? true : false}
          />
          <label onClick={() => onTaskClicked(id)}>
            <span className="description">{description}</span>
            <span className="created">{`created ${formatDistanceStrict(
              new Date(created),
              new Date(updatedAt)
            )} ago`}</span>
          </label>
          <button onClick={() => editTaskHandler(id)} className="icon icon-edit"></button>
          <button onClick={onDeleteClicked.bind(this, id)} className="icon icon-destroy"></button>
        </div>
        {status === EDITING && (
          <input
            autoFocus
            type="text"
            className="edit"
            value={this.state.value}
            onChange={this.onEditChangeHandler}
            onKeyDown={(evt) => {
              if (evt.key === 'Enter') onEditFinished(id, evt.target.value)
            }}
          ></input>
        )}
      </div>
    )
  }
}

Task.defaultProps = {
  onDeleteClicked: () => {
    throw new Error('onDeleteClicked property is undefined! Check it!')
  },
  onEditFinished: () => {
    throw new Error('onEditFinished property is undefined! Check it!')
  },
  onTaskClicked: () => {
    throw new Error('onTaskClicked property is undefined! Check it!')
  },
  editTaskHandler: () => {
    throw new Error('editTaskHandler property is undefined! Check it!')
  },
}

Task.propTypes = {
  onDeleteClicked: PropTypes.func,
  onEditFinished: PropTypes.func,
  onTaskClicked: PropTypes.func,
  editTaskHandler: PropTypes.func,
  itemProps: PropTypes.object.isRequired,
}

export default Task
