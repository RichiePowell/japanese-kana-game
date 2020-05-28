import React, { Component } from 'react';
import { shuffle } from 'lodash';

class AnswerChoices extends Component {

  handleSubmit = (e) => {
    e.preventDefault();
  }

  render() {
    const { answerOptions, checkAnswer } = this.props;

    return (
      <form onSubmit={ this.handleSubmit } className="answer-options">
        {answerOptions && shuffle(answerOptions).map( (answer) => {
          answer = Array.isArray(answer) ? answer[0] : answer;
          return (
          <input
            key={ answer }
            type="submit"
            name="answer"
            value={ answer }
            onClick={ () => checkAnswer(answer) }
          />
        )})}
      </form>
    );
  }
}

export default AnswerChoices;