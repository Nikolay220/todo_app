import React, { useState, useCallback, useEffect } from 'react'
import PropTypes from 'prop-types'

import './NewTaskBar.scss'

const NewTaskBar = (props) => {
  const [enteredTask, setEnteredTask] = useState('')

  useEffect(() => {
    console.log(enteredTask)
  })
  const inputChangeHandler = useCallback((evt) => {
    setEnteredTask(evt.target.value)
  }, [])

  const onSubmit = useCallback((enteredTask, evt) => {
    evt.preventDefault()
    props.onFormSubmit(enteredTask)
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
