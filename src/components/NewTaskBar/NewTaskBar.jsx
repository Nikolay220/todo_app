import React from 'react'
import PropTypes from 'prop-types'

import './NewTaskBar.scss'

class NewTaskBar extends React.Component {
  constructor(props) {
    super(props)
    this.state = { task: '', minutes: '', seconds: '' }
    this.inputChangeHandler = (changedState, evt) => {
      this.setState({ [changedState]: evt.target.value })
    }
    this.onSubmit = (evt) => {
      if (evt.key === 'Enter') {
        this.props.onAddTask(this.state.task)
        this.setState({ task: '', minutes: '', seconds: '' })
      }
    }
    this.onTimeChange = (evt) => {
      if (evt.key === 'Enter' && !evt.target.disabled && evt.target.value) {
        evt.target.disabled = true
      }
    }
    this.onTimeClick = (evt) => {
      if (evt.target.disabled) {
        evt.target.disabled = false
      }
    }
  }
  render() {
    return (
      <form className="new-todo-form">
        <input
          className="new-todo"
          placeholder="Task"
          value={this.state.task}
          onChange={this.inputChangeHandler.bind(this, 'task')}
          onKeyDown={this.onSubmit}
          autoFocus
        />
        <input
          className="new-todo-form__timer"
          placeholder="Min"
          value={this.state.minutes}
          onChange={this.inputChangeHandler.bind(this, 'minutes')}
          onKeyDown={this.onTimeChange}
          onClick={this.onTimeClick}
          autoFocus
        />
        <input
          className="new-todo-form__timer"
          placeholder="Sec"
          value={this.state.seconds}
          onChange={this.inputChangeHandler.bind(this, 'seconds')}
          onKeyDown={this.onTimeChange}
          onClick={this.onTimeClick}
          autoFocus
        />
      </form>
    )
  }
}

NewTaskBar.defaultProps = {
  onAddTask: () => {
    throw new Error('onAddTask property is undefined! Check it!')
  },
}

NewTaskBar.propTypes = {
  onAddTask: PropTypes.func,
}
export default NewTaskBar
