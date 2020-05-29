import React from 'react';

const AudioPreload = () =>
  <>
    <audio preload="auto">
      <source src="success.ogg" />
    </audio>
    <audio preload="auto">
      <source src="error.ogg" />
    </audio>
  </>

export default AudioPreload;