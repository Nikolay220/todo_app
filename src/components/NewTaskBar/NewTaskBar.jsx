import React, { useState, useCallback } from 'react'
import PropTypes from 'prop-types'

import './NewTaskBar.scss'

const NewTaskBar = ({ onFormSubmit }) => {
  const [enteredTask, setEnteredTask] = useState('')

  const inputChangeHandler = useCallback((evt) => {
    setEnteredTask(evt.target.value)
  }, [])

  const onSubmit = useCallback((enteredTask, evt) => {
    evt.preventDefault()
    onFormSubmit(enteredTask)
    setEnteredTask('')
  }, [])

  return (
    <form onSubmit={onSubmit.bind(null, enteredTask)}>
      <input
        className="new-todo"
        placeholder="What needs to be done?"
        value={enteredTask}
        onChange={inputChangeHandler}
        autoFocus
      />
    </form>
  )
}

NewTaskBar.defaultProps = {
  onFormSubmit: () => {
    throw new Error('onFormSubmit property is undefined! Check it!')
  },
}

NewTaskBar.propTypes = {
  onFormSubmit: PropTypes.func,
}
export default NewTaskBar
