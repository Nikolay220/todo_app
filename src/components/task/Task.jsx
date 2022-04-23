import React from 'react'
import { formatDistanceStrict } from 'date-fns'
import PropTypes from 'prop-types'

import './Task.scss'

class Task extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      value: props.itemProps.description,
    }
    this.onEditChangeHandler = this.onEditChangeHandler.bind(this)

    // this.onTimerPlay = (id) => {
    //   if (!this.props.itemProps.timeIsOver) {
    //     this.props.addTimer(id)
    //   }
    // }

    // this.onTimerPause = (id) => {
    //   this.props.removeTimer(id)
    // }
  }

  onEditChangeHandler(event) {
    this.setState({ value: event.target.value })
  }

  componentDidUpdate(prevProps) {
    // timer is finished
    if (prevProps.itemProps.timeIsOver !== this.props.itemProps.timeIsOver) {
      this.props.onPauseTimer(this.props.itemProps.id)
    }
  }

  componentWillUnmount() {
    // Object.entries(this.intervals).forEach((value) => {
    //   clearInterval(value[1])
    // })
  }
  render() {
    const { id, status, description, created, updatedAt, minutes, seconds } = this.props.itemProps
    const { onEditFinished, onTaskClicked, onCloseBtnClicked, editTaskHandler, onPlayTimer, onPauseTimer } = this.props
    return (
      <div>
        <div className="view">
          <input
            onChange={() => onTaskClicked(id)}
            className="toggle"
            type="checkbox"
            checked={status === 'completed' ? true : false}
          />
          <label>
            <span onClick={() => onTaskClicked(id)} className="title">
              {description}
            </span>
            <span className="description">
              <button
                className="icon icon-play"
                onClick={() => {
                  onPlayTimer(id)
                }}
              ></button>
              <button
                className="icon icon-pause"
                onClick={() => {
                  onPauseTimer(id)
                }}
              ></button>
              {`${minutes}:${seconds > 9 ? seconds : '0' + seconds}`}
            </span>
            <span className="description">{`created ${formatDistanceStrict(created, updatedAt)} ago`}</span>
          </label>
          <button onClick={() => editTaskHandler(id)} className="icon icon-edit"></button>
          <button onClick={onCloseBtnClicked.bind(this, id)} className="icon icon-destroy"></button>
        </div>
        {status === 'editing' && (
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
  minutes: 12,
  seconds: 54,
  timeIsOver: false,
}

Task.propTypes = {
  onCloseBtnClicked: PropTypes.func,
  onEditFinished: PropTypes.func,
  onTaskClicked: PropTypes.func,
  editTaskHandler: PropTypes.func,
  itemProps: PropTypes.object.isRequired,
  minutes: PropTypes.number,
  seconds: PropTypes.number,
  timeIsOver: PropTypes.bool,
}

export default Task
