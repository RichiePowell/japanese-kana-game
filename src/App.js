import React from 'react'
import { Consumer } from './components/context'
import WebFont from 'webfontloader'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { library } from '@fortawesome/fontawesome-svg-core'
import { faVolumeUp, faVolumeMute, faSpinner, faCheck } from '@fortawesome/free-solid-svg-icons'
import Game from './components/Game'
import StartScreen from './components/StartScreen'
import './App.scss'

/* Add FontAwesome icons via library */
library.add(faVolumeUp, faVolumeMute, faSpinner, faCheck)

/* Add web fonts */
WebFont.load({
  google: {
    families: ['Kaushan Script', 'Source Sans Pro']
  }
})

const App = () =>
  <Consumer>
    { ({ gameStart }) => (
      <div className="App">
        <div className="container">
          { gameStart ?
            <Game />
            :
            <StartScreen />
          }
        </div>

        <FontAwesomeIcon icon="spinner" spin className="loading" />
      </div>
      ) }
  </Consumer>

export default App
