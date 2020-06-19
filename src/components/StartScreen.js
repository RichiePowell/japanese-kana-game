import React from 'react'
import Header from './Header'
import ChangeKana from './controls/start/ChangeKana'
import Options from './controls/start/Options'
import StartButton from './controls/start/StartButton'

export const StartScreen = () =>
  <div className="start-screen">
    <Header />
    <ChangeKana />
    <Options />
    <StartButton />
  </div>

export default StartScreen
