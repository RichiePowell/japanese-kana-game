import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

const ChangeAnswerTimer = ({ answerTimer, actions }) =>
  <div className="float-right">
    <div className="input-label">Time to answer</div>
    <FontAwesomeIcon icon="stopwatch" className="fa-fw answer-time-icon" />
    <select
      className="input-control"
      onChange={ (e) => {
        actions.changeAnswerTimer(e.target.value);
        if(e.target.value !== "0") {
          document.querySelector('.answer-time-icon').classList.add('active');
        } else {
          document.querySelector('.answer-time-icon').classList.remove('active');
        }
      }}
      value={ answerTimer }
    >
      <option value="0">No limit</option>
      <option value="1">1 second</option>
      <option value="2">2 seconds</option>
      <option value="3">3 seconds</option>
      <option value="4">4 seconds</option>
      <option value="5">5 seconds</option>
      <option value="6">6 seconds</option>
      <option value="7">7 seconds</option>
      <option value="8">8 seconds</option>
      <option value="9">9 seconds</option>
      <option value="10">10 seconds</option>
    </select>
  </div>

export default ChangeAnswerTimer