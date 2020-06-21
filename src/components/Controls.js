import React from 'react'
import { Consumer } from './context'
import Audio from './controls/Audio'
import DarkMode from './controls/DarkMode'
import InputToggle from './controls/InputToggle'
import EndGame from './controls/EndGame'

const Controls = () =>
  <Consumer>
    { ({ actions, sound }) => (
      <div className="controls">
        <Audio sound={sound} actions={actions} />
        <DarkMode />
        <InputToggle actions={actions} />
        <div className="float-right">
          <EndGame actions={actions} />
        </div>
      </div>
    )}
  </Consumer>

export default Controls