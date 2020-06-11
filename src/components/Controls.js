import React from 'react'
import ChangeKana from './controls/ChangeKana'
import Audio from './controls/Audio'
import InputToggle from './controls/InputToggle'

const Controls = () =>
  <div className="controls">
    <Audio />
    <ChangeKana />
    <InputToggle />
  </div>

export default Controls