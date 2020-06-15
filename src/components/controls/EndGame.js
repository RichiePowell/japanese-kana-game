import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

const EndGame = ({actions}) =>
  <button
    className="input-control icon end"
    onClick={ actions.endGame }
    type="button"
  >
    <FontAwesomeIcon icon="times" />
  </button>

export default EndGame