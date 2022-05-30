import React, { useState, useCallback } from 'react'
import { formatDistanceStrict } from 'date-fns'
import PropTypes from 'prop-types'

import ACTIONS from '../../actions'
import './Task.scss'
const { EDITING, COMPLETED } = ACTIONS
const Task = ({
  onEditFinished,
  onTaskClicked,
  onDeleteClicked,
  editTaskHandler,
  itemProps: { id, status, description, created, updatedAt },
}) => {
  const [desc, setDesc] = useState(description)

  const onEditChangeHandler = useCallback((event) => {
    setDesc(event.target.value)
  }, [])

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
          value={desc}
          onChange={onEditChangeHandler}
          onKeyDown={(evt) => {
            if (evt.key === 'Enter') onEditFinished(id, evt.target.value)
          }}
        ></input>
      )}
    </div>
  )
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
