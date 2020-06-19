import React from 'react'
import { Consumer } from './context'
import Header from './Header'
import ChangeKana from './controls/start/ChangeKana'
import Options from './controls/start/Options'
import StartButton from './controls/start/StartButton'

export const StartScreen = () =>
  <Consumer>
    { ({ actions }) => {
      return (
        <div className="start-screen">
          <Header />
          <ChangeKana />
          <Options />
          <StartButton />
        </div>
      )
    }}
  </Consumer>

export default StartScreen
