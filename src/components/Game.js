import React from 'react'

/* Third Party */
import SweetAlert from 'sweetalert2-react'

/* Components */
import { Consumer } from './context'
import Header from './Header'
import Score from './Score'
import Character from './Character'
import Input from './Input'
import Controls from './Controls'
import AudioPreload from './AudioPreload'

export const Game = () =>
  <>
    <Consumer>
      { context => (
        <>
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
        </>
      )}
    </Consumer>
    <AudioPreload />
  </>

export default Game
