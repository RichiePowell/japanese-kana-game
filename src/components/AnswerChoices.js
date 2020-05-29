import React from 'react';
import { shuffle } from 'lodash';

const AnswerChoices = ({ answerOptions, checkAnswer }) => {
  return (
    <div className="answer-options">
      {answerOptions && shuffle(answerOptions).map( (answer, index) => {
        answer = Array.isArray(answer) ? answer[0] : answer;
        return (
        <button
          key={ answer + index }
          type="button"
          name="answer"
          value={ answer }
          onClick={ () => checkAnswer(answer) }
        >{ answer }</button>
      )})}
    </div>
  );
}

export default AnswerChoices;