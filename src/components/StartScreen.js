import React from 'react'
import { Consumer } from './context'
import Header from './Header'
import ChangeKana from './controls/start/ChangeKana'
import SelectMode from './controls/SelectMode'

export const StartScreen = () =>
  <Consumer>
    { ({ actions }) => {
      return (
        <div className="start-screen">
          <Header />
          <ChangeKana />
          <div className="start-block">
            <div>Select mode:</div>
            <div><SelectMode /></div>
          </div>
          <div className="text-center">
            <button className="input-control alt" onClick={ actions.startGame }>Start Game</button>
          </div>
        </div>
      )
    }}
  </Consumer>

export default StartScreen
