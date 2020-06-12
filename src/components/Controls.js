import React from 'react'
import ChangeKana from './controls/ChangeKana'
import Audio from './controls/Audio'
import InputToggle from './controls/InputToggle'

const Controls = () =>
  <div className="controls">
    <Audio />
    <div className="float-right">
      <InputToggle />
      <ChangeKana />
    </div>
  </div>

export default Controls