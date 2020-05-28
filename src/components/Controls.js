import React from 'react';
import ChangeKana from './controls/ChangeKana.js';
import Audio from './controls/Audio.js';

const Controls = ({ sound, toggleSound, handleKanaChange, toggleInput }) => {
  return (
    <div className="controls">
      <Audio
        sound={sound}
        toggleSound={toggleSound}
      />
      <ChangeKana handleKanaChange={handleKanaChange} />
      <button
        onClick={toggleInput}
      >Toggle input mode</button>
    </div>
  );
}

export default Controls;