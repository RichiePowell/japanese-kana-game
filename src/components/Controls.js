import React from 'react'
import { Consumer } from './context'
import ChangeKana from './controls/ChangeKana'
import Audio from './controls/Audio'
import InputToggle from './controls/InputToggle'
import EndGame from './controls/EndGame'

const Controls = () =>
  <Consumer>
    { ({ actions, kana, allowKanaChange, sound }) => (
      <div className="controls">
        <Audio sound={sound} actions={actions} />
        <InputToggle actions={actions} />
        <ChangeKana
          actions={actions}
          allowKanaChange={allowKanaChange}
          kana={kana}
        />
        <div className="float-right">
          <EndGame actions={actions} />
        </div>
      </div>
    )}
  </Consumer>

export default Controls