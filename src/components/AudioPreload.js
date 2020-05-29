import React from 'react';

const AudioPreload = () => {
  return (
    <>
      <audio preload="auto">
        <source src="success.ogg" />
      </audio>
      <audio preload="auto">
        <source src="error.ogg" />
      </audio>
    </>
  );
}

export default AudioPreload;