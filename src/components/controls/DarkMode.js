import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

const DarkMode = () =>
  <button
    className="input-control icon dark-mode"
    onClick={ () => document.querySelector('body').classList.toggle('dark') }
  >
    <FontAwesomeIcon icon="adjust" />
  </button>

export default DarkMode