import React, { useState, useCallback } from 'react'
import { formatDistanceStrict } from 'date-fns'
import PropTypes from 'prop-types'

import './Task.scss'

const Task = (props) => {
  const [desc, setDesc] = useState(props.itemProps.description)

  const onEditChangeHandler = useCallback((event) => {
    setDesc(event.target.value)
  }, [])

  const { id, status, description, created, updatedAt } = props.itemProps
  const { onEditFinished, onTaskClicked, onCloseBtnClicked, editTaskHandler } = props
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
          <span className="created">{`created ${formatDistanceStrict(created, updatedAt)} ago`}</span>
        </label>
        <button onClick={() => editTaskHandler(id)} className="icon icon-edit"></button>
        <button onClick={onCloseBtnClicked.bind(this, id)} className="icon icon-destroy"></button>
      </div>
      {status === 'editing' && (
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
