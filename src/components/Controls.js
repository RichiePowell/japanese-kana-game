import React from 'react';
import ChangeKana from './controls/ChangeKana.js';
import Audio from './controls/Audio.js';

const Controls = ({sound, toggleSound, handleKanaChange}) => {
  return (
    <div className="controls">
      <Audio
        sound={sound}
        toggleSound={toggleSound}
      />
      <ChangeKana handleKanaChange={handleKanaChange} />
    </div>
  );
}

export default Controls;