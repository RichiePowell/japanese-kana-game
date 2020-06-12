import React from 'react'
import { Consumer } from '../context'

const SelectMode = () =>
  <Consumer>
    { ({ mode, actions }) => (
      <select
        onChange={ (e) => actions.handleModeChange(e.target.value) }
        className="input-control"
        value={ mode }
      >
        <option value="unlimited">Unlimited</option>
        <option value="timer">30 second timer</option>
        <option value="timerForEachAnswer">Answer time limit</option>
      </select>
    )}
  </Consumer>

export default SelectMode