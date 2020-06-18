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
          <Score key={( context.correctAnswers + context.wrongAnswers )} />
          <Character />
          { context.mode === 'timer' || context.mode === 'timerForEachAnswer' ?
            <div className="countdown">
              <CountdownCircleTimer
                isPlaying={context.timerTicking}
                key={context.timerKey}
                size={250}
                onComplete={() => {
                  if(context.mode === 'timerForEachAnswer') {
                    context.actions.checkAnswer('Omae wa mou shindeiru');
                  } else {
                    context.actions.endGame();
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
                context.actions.toggleWrongAnswerDialog()
                context.actions.loadNewCharacter()
              }
            }
          />
          <SweetAlert
            show={context.showReport}
            title="Game Over!"
            onConfirm={() => {
                context.actions.toggleReport()
                context.actions.clearStats()
              }
            }
            html={`
              <div class="report-totals">
                <div class="report-totals--box time">
                  <div class="report-totals--box--label">Time</div>
                  <div class="report-totals--box--total">${ Math.floor((context.gameFinishTime - context.gameStartTime) / 1000) }s</div>
                </div>
                <div class="report-totals--box">
                  <div class="report-totals--box--label">Correct</div>
                  <div class="report-totals--box--total">${ context.correctAnswersTotal }</div>
                </div>
                <div class="report-totals--box">
                  <div class="report-totals--box--label">Wrong</div>
                  <div class="report-totals--box--total">${ context.wrongAnswersTotal }</div>
                </div>
              </div>
            `}
          >
          </SweetAlert>
        </>
      )}
    </Consumer>
    <AudioPreload />
  </>

export default Game
