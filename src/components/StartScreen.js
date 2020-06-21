import React from 'react'
import { Consumer } from './context'
import Header from './Header'
import ChangeKana from './controls/start/ChangeKana'
import Options from './controls/start/Options'
import Audio from './controls/Audio'
import DarkMode from './controls/DarkMode'
import StartButton from './controls/start/StartButton'

const StartScreen = () =>
  <Consumer>
    { ({ actions, kana, answerTimer, gameTimer, showWrongAnswerDialog, sound }) => (
      <div className="start-screen">
        <Header />
        <ChangeKana
          kana={kana}
          actions={actions} />
        <Options
          answerTimer={answerTimer}
          gameTimer={gameTimer}
          showWrongAnswerDialog={showWrongAnswerDialog}
          actions={actions} />
        <div className="text-center">
          <Audio
            sound={sound}
            actions={actions} />
          <StartButton actions={actions} />
          <DarkMode />
        </div>
      </div>
    )}
  </Consumer>

export default StartScreen
