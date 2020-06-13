import React from 'react'
import { Consumer } from './../context'

const InputToggle = () =>
  <Consumer>
    { ({ actions }) => (
      <button className="input-control" onClick={ actions.toggleInput }>Toggle input</button>
    )}
  </Consumer>

export default InputToggle