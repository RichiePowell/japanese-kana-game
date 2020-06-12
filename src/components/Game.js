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
// import Timer from './Timer'
import { CountdownCircleTimer } from 'react-countdown-circle-timer'

export const Game = () =>
  <>
    <Consumer>
      { context => (
        <>
          <Header />
          <Score key={ ( context.correctAnswers + context.wrongAnswers ) } />
          <Character />
          { context.mode === 'timer' || context.mode === 'timerForEachAnswer' ?
            <div className="countdown">
              <CountdownCircleTimer
                isPlaying
                key={context.timerKey}
                size={250}
                onComplete={() => {
                  if(context.mode === 'timerForEachAnswer') {
                    context.actions.checkAnswer('Omae wa moe shindeiru');
                  }
                }}
                duration={ context.timer }
                colors={[['#e67272']]}
                trailColor="#c83232"
              />
            </div>
            : ''
          }
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
