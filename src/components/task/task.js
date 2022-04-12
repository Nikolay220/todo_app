import React from 'react'
import { formatDistanceToNow } from 'date-fns'
import PropTypes from 'prop-types'

import './task.css'

function reformatCreationTime(time) {
  if (time.includes('seconds')) return 'created ' + time.split(' ')[2] + ' seconds ago'
  else if (time.includes('half')) {
    return 'created 30 seconds ago'
  } else if (time.includes('less') && time.includes('minute')) {
    return 'created 50 seconds ago'
  } else if (time.includes('minutes')) {
    return 'created ' + time.split(' ')[0] + ' minutes ago'
  } else if (time.includes('minute')) {
    return 'created 1 minute ago'
  } else if (time.includes('hours')) {
    return 'created ' + time.split(' ')[1] + ' hours ago'
  } else if (time.includes('hour')) {
    return 'created 1 hour ago'
  }
  return time
}

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
    const { id, status, description, created } = this.props.itemProps
    const { onEditFinished, onTaskClicked, onCloseBtnClicked, editTaskHandler } = this.props
    return (
      <div>
        <div className="view">
          <input
            onChange={() => onTaskClicked(id)}
            className="toggle"
            type="checkbox"
            checked={status === 'completed' ? true : false}
          />
          <label onClick={() => onTaskClicked(id)}>
            <span className="description">{description}</span>
            <span className="created">
              {reformatCreationTime(formatDistanceToNow(created, { includeSeconds: true }))}
            </span>
          </label>
          <button onClick={() => editTaskHandler(id)} className="icon icon-edit"></button>
          <button onClick={onCloseBtnClicked.bind(this, id)} className="icon icon-destroy"></button>
        </div>
        {status === 'editing' && (
          <input
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
  onCloseBtnClicked: () => {
    throw new Error('onCloseBtnClicked property is undefined! Check it!')
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
  onCloseBtnClicked: PropTypes.func,
  onEditFinished: PropTypes.func,
  onTaskClicked: PropTypes.func,
  editTaskHandler: PropTypes.func,
  itemProps: PropTypes.object.isRequired,
}

export default Task
