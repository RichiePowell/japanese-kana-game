import React, { Component } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

class Input extends Component {
  answer = React.createRef();

  handleSubmit = (e) => {
    e.preventDefault();
    this.currentAnswer = this.answer.current.value;
    this.props.checkAnswer(this.currentAnswer);
    this.answer.current.focus();
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
          onClick={ () => this.props.toggleSound() }
          type="button"
        >
          <FontAwesomeIcon icon={ this.props.sound ? 'volume-up' : 'volume-off' } />
        </button>
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