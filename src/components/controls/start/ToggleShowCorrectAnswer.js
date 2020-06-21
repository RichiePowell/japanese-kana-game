import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

const ToggleShowCorrectAnswer = ({ showWrongAnswerDialog, actions }) =>
  <>
    <input type="checkbox"
      className="input-row__checkbox__input"
      id="showCorrectAnswer"
      checked={ showWrongAnswerDialog }
      onChange={ (e) => { actions.toggleWrongAnswerDialog(e.target.checked) }} />
    <label
      className="input-row input-label"
      htmlFor="showCorrectAnswer"
    >
      <div className="input-row__checkbox">
        <FontAwesomeIcon
          icon="check"
          className="input-row__checkbox__check"
        />
      </div>
      Show correct answer after mistake
    </label>
  </>

export default ToggleShowCorrectAnswer