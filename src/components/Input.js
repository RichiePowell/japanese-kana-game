import React, { Component } from 'react';

class Input extends Component {
  answer = React.createRef();

  handleSubmit = (e) => {
    e.preventDefault();
    this.currentAnswer = this.answer.current.value;
    this.props.checkAnswer(this.currentAnswer);
    this.answer.current.focus();
    e.currentTarget.reset();
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
          autoFocus="true"
        />
        <input
          type="submit"
          value="Check"
          className="submit"
        />
      </form>
    )
  }
}

export default Input;