import React from 'react'
import { Consumer } from './context'
import ChangeKana from './controls/ChangeKana'
import Audio from './controls/Audio'

const Controls = () => {
  return (
    <Consumer>
      { ({ actions }) => (
        <div className="controls">
          <Audio />
          <ChangeKana />
          <button
            onClick={ actions.toggleInput }
          >Toggle input mode</button>
        </div>
      )}
    </Consumer>
  );
}

export default Controls