import React from 'react'
import { Consumer } from './../context'

const ChangeKana = () =>
  <Consumer>
    { ({ kana, actions, allowKanaChange }) => (
      allowKanaChange ?
        <select
          onChange={ (e) => actions.setKana(e.target.value) }
          className="kana input-control"
          value={ kana }
        >
          <option value="all">All Kana</option>
          <option value="Hiragana">Hiragana</option>
          <option value="Katakana">Katakana</option>
        </select>
      : ''
    )}
  </Consumer>

export default ChangeKana