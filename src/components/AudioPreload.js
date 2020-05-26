import React from 'react';

const AudioPreload = () => {
  return (
    <div className="audio-preload">
      <audio preload="auto">
        <source src="success.ogg" />
      </audio>
      <audio preload="auto">
        <source src="error.ogg" />
      </audio>
    </div>
  );
}

export default AudioPreload;