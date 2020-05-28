import React, { Component } from 'react';
import AnswerInput from './AnswerInput.js';
import AnswerChoices from './AnswerChoices.js';

class Input extends Component {
  render() {
    const { keyboardMode, checkAnswer, answerOptions } = this.props;

    return (
      <div className="answers">
        { keyboardMode ?
          <AnswerInput checkAnswer={ checkAnswer } />
        :
          <AnswerChoices
            answerOptions={ answerOptions }
            checkAnswer={ checkAnswer }
          />
        }
      </div>
    )
  }
}

export default Input;