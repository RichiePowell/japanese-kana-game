import React from 'react'
import { Consumer } from '../../context'
import { ChangeAnswerTimer } from 'ChangeAnswerTimer'
import { ChangeGameTimer } from 'ChangeGameTimer'
import { ToggleShowCorrectAnswer } from 'ToggleShowCorrectAnswer'

const Options = () =>
  <Consumer>
    { ({ answerTimer, gameTimer, showWrongAnswerDialog, actions }) => (
      <div className="option-boxes vertical standout">
        <ChangeAnswerTimer
          answerTimer={answerTimer}
          actions={actions} />
        <ChangeGameTimer
          gameTimer={gameTimer}
          actions={actions} />
        <ToggleShowCorrectAnswer
          showWrongAnswerDialog={showWrongAnswerDialog}
          actions={actions}  />
      </div>
    )}
  </Consumer>

export default Options