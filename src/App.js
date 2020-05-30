import React from 'react'

/* Third Party */
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import SweetAlert from 'sweetalert2-react'
import WebFont from 'webfontloader'
import { library } from '@fortawesome/fontawesome-svg-core'
import { faVolumeUp, faVolumeMute, faSpinner } from '@fortawesome/free-solid-svg-icons'

/* Components */
import { Consumer } from './components/context'
import Header from './components/Header'
import Score from './components/Score'
import Character from './components/Character'
import Input from './components/Input'
import Controls from './components/Controls'
import AudioPreload from './components/AudioPreload'

/* Styling */
import './App.scss'

/* Add FontAwesome icons via library */
library.add(faVolumeUp, faVolumeMute, faSpinner)

/* Add web fonts */
WebFont.load({
  google: {
    families: ['Kaushan Script', 'Source Sans Pro']
  }
})

export const App = () =>
  <div className="App">

    <Consumer>
      { context => (
        <div className="container">
          <Header />
          <Score key={ ( context.correctAnswers + context.wrongAnswers ) } />
          <Character />
          <Input />
          <Controls />
          <SweetAlert
            show={context.showWrongAnswerDialog}
            title={context.currentCharacter + " is " +context.currentAnswerPrintable}
            type="error"
            onConfirm={() => {
                context.actions.toggleWrongAnswerDialog();
                context.actions.loadNewCharacter();
              }
            }
          />
        </div>
      )}
    </Consumer>
    <FontAwesomeIcon icon="spinner" spin className="loading" />
    <AudioPreload />
  </div>

export default App
