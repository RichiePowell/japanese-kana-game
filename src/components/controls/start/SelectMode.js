import React from 'react'
import { Consumer } from '../../context'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

const SelectMode = () =>
  <Consumer>
    { ({ mode, actions }) => (
      <div className="option-boxes vertical standout">
        <input
          type="radio"
          name="mode"
          id="mode-unlimited"
          value="unlimited"
          checked={ mode === 'unlimited' ? true : false }
          onChange={ e => actions.handleModeChange(e.target.value) }
        />
        <label className="box" htmlFor="mode-unlimited">
          <FontAwesomeIcon icon="infinity" className="fa-fw" />
          Unlimited practice
          <FontAwesomeIcon icon="check" className="check" />
        </label>
        <input
          type="radio"
          name="mode"
          id="mode-timer"
          value="timer"
          checked={ mode === 'timer' ? true : false }
          onChange={ e => actions.handleModeChange(e.target.value) }
        />
        <label className="box" htmlFor="mode-timer">
          <FontAwesomeIcon icon="clock" className="fa-fw" />
          30 second timer
          <FontAwesomeIcon icon="check" className="check" />
        </label>
        <input
          type="radio"
          name="mode"
          id="mode-timerForEachAnswer"
          value="timerForEachAnswer"
          checked={ mode === 'timerForEachAnswer' ? true : false }
          onChange={ e => actions.handleModeChange(e.target.value) }
        />
        <label className="box" htmlFor="mode-timerForEachAnswer">
          <FontAwesomeIcon icon="stopwatch" className="fa-fw" />
          Answer time limit
          <FontAwesomeIcon icon="check" className="check" />
        </label>
      </div>
    )}
  </Consumer>

export default SelectMode