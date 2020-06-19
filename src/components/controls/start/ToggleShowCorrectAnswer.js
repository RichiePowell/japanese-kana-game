import React from 'react'

const ChangeGameTimer = ({ showWrongAnswerDialog, actions }) =>
  <div className="input-row">
    <label className="input-label">
      <input type="checkbox"
        id="showCorrectAnswer"
        className="show"
        checked={ showWrongAnswerDialog }
        onChange={ (e) => { actions.toggleWrongAnswerDialog(e.target.checked) }} />
      Show correct answer after mistake
    </label>
  </div>

export default ChangeGameTimer