import React from 'react'
import PropTypes from 'prop-types'

import './NewTaskBar.scss'

class NewTaskBar extends React.Component {
  constructor(props) {
    super(props)
    this.state = { curVal: '' }
    this.inputChangeHandler = (evt) => {
      this.setState({ curVal: evt.target.value })
    }
    const { onFormSubmit } = this.props
    this.onSubmit = (evt) => {
      evt.preventDefault()
      onFormSubmit(this.state.curVal)
      this.setState({ curVal: '' })
    }
  }

  render() {
    return (
      <form onSubmit={this.onSubmit}>
        <input
          className="new-todo"
          placeholder="What needs to be done?"
          value={this.state.curVal}
          onChange={this.inputChangeHandler}
          autoFocus
        />
      </form>
    )
  }
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
