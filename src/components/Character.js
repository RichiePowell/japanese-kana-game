import React, { Component } from 'react';

class Character extends Component {
  render() {
    return (
      <div className="character">
        { this.props.currentCharacter }
      </div>
    )
  }
}

export default Character;