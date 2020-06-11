import React from 'react'
import { Consumer } from './../context'

const InputToggle = () =>
  <Consumer>
    { ({ actions }) => (
      <button onClick={ actions.toggleInput }>Toggle input mode</button>
    )}
  </Consumer>

export default InputToggle