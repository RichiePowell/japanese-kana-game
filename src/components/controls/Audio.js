import React from 'react'
import { Consumer } from './../context'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

const Audio = () => {
  return (
    <Consumer>
      { ({ sound, actions }) => (
        <button
          className="sound"
          onClick={ actions.toggleSound }
          type="button"
        >
          <FontAwesomeIcon icon={ sound ? 'volume-up' : 'volume-mute' } />
        </button>
      )}
    </Consumer>
  )
}

export default Audio