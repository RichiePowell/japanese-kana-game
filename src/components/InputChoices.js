import React from 'react'
import { Consumer } from './context'

const InputChoices = () => {
  return (
    <Consumer>
      { ({ answerOptions, actions }) => (
        <div className="answer-options">
          {answerOptions && answerOptions.map( (answer, index) => {
            answer = Array.isArray(answer) ? answer[0] : answer;
            return (
            <button
              key={ answer + index }
              type="button"
              name="answer"
              value={ answer }
              onClick={ () => actions.checkAnswer(answer) }
            >{ answer }</button>
          )})}
        </div>
      )}
    </Consumer>
  )
}

export default InputChoices;