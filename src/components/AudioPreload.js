import React from 'react';

const AudioPreload = () => {
  return (
    <div className="audio-preload">
      <audio preload>
        <source src="success.mp3" />
      </audio>
      <audio preload>
        <source src="error.mp3" />
      </audio>
    </div>
  );
}

export default AudioPreload;