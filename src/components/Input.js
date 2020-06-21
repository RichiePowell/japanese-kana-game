import React from 'react'
import InputKeyboard from './InputKeyboard'
import InputChoices from './InputChoices'

const Input = ({ keyboardMode }) =>
  <div className="answers">
    { keyboardMode ?
      <InputKeyboard />
    :
      <InputChoices />
    }
  </div>

export default Input