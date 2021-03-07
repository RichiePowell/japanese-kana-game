import React, { useContext, useEffect } from 'react'
import { useHistory } from 'react-router-dom'

/* Third Party */
import SweetAlert from 'sweetalert2-react'

/* Components */
import { GameData } from './context'
import Header from './Header'
import Score from './Score'
import Character from './Character'
import Input from './Input'
import Controls from './Controls'
import { CountdownCircleTimer } from 'react-countdown-circle-timer'

export const Game = () => {
  const context = useContext(GameData);
  let history = useHistory();

  // Use hooks to start the game on mount
  useEffect(() => {
    context.actions.startGame()
    // ... and end it on unmount
    return () => context.actions.endGame();
    
    // eslint-disable-next-line
  }, [])

  const getAnswerCorrection = () => {
    let matchingCharacters = [];

    Object.keys(context.kana).forEach(kana => {
      Object.keys(context.kana[kana].characters).forEach(char => {
        if(context.kana[kana].characters[char] === context.currentUserAnswer) {
          matchingCharacters.push( char );
        }
      })
    })
    
    return matchingCharacters;
  }

  return (
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
              history.push("/")
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
        title={ context.currentCharacter + " is " + context.currentAnswerPrintable }
        type="error"
        onConfirm={() => {
            context.actions.hideWrongAnswerDialog()
            context.actions.loadNewCharacter()
          }
        }
        html={ context.currentUserAnswer !== 'Omae wa mou shindeiru' ? context.currentUserAnswer + ' is ' + getAnswerCorrection().join(', ') : '' }
      />
    </>
  )
}

export default Game
