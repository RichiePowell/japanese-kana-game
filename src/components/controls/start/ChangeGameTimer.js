import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

const ChangeGameTimer = ({ gameTimer, actions }) =>
  <>
    <div className="input-label">Game time</div>
    <FontAwesomeIcon icon="clock" className="fa-fw" />
    <select
        className="input-control"
        onChange={ (e) => { actions.changeGameTimer(e.target.value)}}
        value={ gameTimer }
      >
      <option value="0">No limit</option>
      <option value="30">30 seconds</option>
      <option value="60">1 minute</option>
      <option value="120">2 minutes</option>
      <option value="300">5 minutes</option>
      <option value="600">10 minutes</option>
      <option value="900">15 minutes</option>
    </select>
  </>

export default ChangeGameTimer