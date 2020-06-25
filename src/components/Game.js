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
import GameOverModalContent from './modals/GameOver'
import { CountdownCircleTimer } from 'react-countdown-circle-timer'

export const Game = () =>
  <>
    <Consumer>
      { context => (
        <>
          <Header />
          <Score key={( context.correctAnswersTotal + context.wrongAnswersTotal )} />
          <Character currentCharacter={ context.currentCharacter } />
          { context.answerTimer > 0 ?
            <div className="countdown">
              <CountdownCircleTimer
                isPlaying={context.answerTimerTicking}
                key={context.answerTimerKey}
                size={250}
                onComplete={() => {
                  context.actions.checkAnswer('Omae wa mou shindeiru');
                }}
                duration={ context.answerTimer }
                colors={[ context.darkMode ? ['#ad4e4e'] : ['#e67272'] ]}
                trailColor="transparent"
              />
            </div>
            : ''
          }
          { context.gameTimer > 0 ?
            <div className="game-timer">
              <CountdownCircleTimer
                isPlaying={ context.gameTimerTicking }
                key={ context.gameTimerKey }
                size={50}
                onComplete={() => {
                  context.actions.endGame()
                }}
                duration={ context.gameTimer }
                colors={[['#ccc']]}
                trailColor="#666"
                strokeWidth={5}
              >
                { ({remainingTime}) => 
                  remainingTime > 60 ?
                  Math.floor(remainingTime / 60) + 'm'
                  : remainingTime
                }
              </CountdownCircleTimer>
            </div>
            : ''
          }
          <Input keyboardMode={ context.keyboardMode } />
          <Controls />
          <SweetAlert
            show={ context.wrongAnswerDialogActive }
            title={context.currentCharacter + " is " +context.currentAnswerPrintable}
            type="error"
            onConfirm={() => {
                context.actions.hideWrongAnswerDialog()
                context.actions.loadNewCharacter()
              }
            }
          />
          <SweetAlert
            show={ context.showReport }
            title="Game Over!"
            onConfirm={() => {
                context.actions.toggleReport()
                context.actions.clearStats()
              }
            }
            html={ GameOverModalContent(context) }
          />
        </>
      )}
    </Consumer>
  </>

export default Game
