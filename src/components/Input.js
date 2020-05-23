import React, { Component } from 'react';

class Input extends Component {
  answer = React.createRef();

  handleSubmit = (e) => {
    e.preventDefault();
    this.currentAnswer = this.answer.current.value;
    this.answer.current.focus();

    if(this.currentAnswer === '') {
      return false;
    }

    this.props.checkAnswer(this.currentAnswer);
    e.currentTarget.reset();
  }

  componentDidMount () {
    this.answer.current.focus();
  }

  render() {
    return (
      <form
        className="input"
        onSubmit={ this.handleSubmit }
      >
        <input
          name="answer"
          ref={this.answer}
          type="text"
          className="answer"
          placeholder="Enter answer..."
          maxLength="3"
        />
        <input
          type="submit"
          value="Check"
          className="submit"
        />
        <button
          className="skip"
          onClick={ () => this.props.loadNewCharacter() }
          type="button"
        >
          Skip
        </button>
      </form>
    )
  }
}

export default Input;