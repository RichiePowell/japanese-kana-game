import React, { Component } from 'react';
import AnswerInput from './AnswerInput';
import AnswerChoices from './AnswerChoices';

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