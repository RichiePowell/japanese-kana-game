import React from 'react'
import { Consumer } from './context'
import InputKeyboard from './InputKeyboard'
import InputChoices from './InputChoices'

const Input = () => {
  return (
    <Consumer>
      { ({ keyboardMode }) => (
        <div className="answers">
          { keyboardMode ?
            <InputKeyboard />
          :
            <InputChoices />
          }
        </div>
      )}
    </Consumer>
  )
}

export default Input