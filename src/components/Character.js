import React from 'react'
import { Consumer } from './context'

const Character = () => {
  return (
    <Consumer>
      { context => (
        <div className="character">
          { context.currentCharacter }
        </div>
      )}
    </Consumer>
  )
}

export default Character