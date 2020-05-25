import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const Audio = ({sound, toggleSound}) => {
  return (
    <button
      className="sound"
      onClick={ toggleSound }
      type="button"
    >
      <FontAwesomeIcon icon={ sound ? 'volume-up' : 'volume-mute' } />
    </button>
  );
}

export default Audio;