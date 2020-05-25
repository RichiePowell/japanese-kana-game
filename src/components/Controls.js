import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const Controls = ({sound, toggleSound, loadNewCharacter}) => {
  return (
    <div className="controls">
      <button
        className="sound"
        onClick={ toggleSound }
        type="button"
      >
        <FontAwesomeIcon icon={ sound ? 'volume-up' : 'volume-mute' } />
      </button>
      <button
        className="skip"
        onClick={ loadNewCharacter }
        type="button"
      >
        Skip
      </button>
    </div>
  );
}

export default Controls;