import React, { Component } from 'react';

class AudioPreload extends Component {
  shouldComponentUpdate() {
      return false
  }

  render() {
    console.log('test');
    return (
      <>
        <audio preload="auto">
          <source src="success.ogg" />
        </audio>
        <audio preload="auto">
          <source src="error.ogg" />
        </audio>
      </>
    )
  }
}

export default AudioPreload;