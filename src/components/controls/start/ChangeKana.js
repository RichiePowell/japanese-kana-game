import React from 'react'
import { Consumer } from './../../context'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

const ChangeKana = () =>
  <Consumer>
    { ({ kana, actions }) => (
      <div className="option-boxes">
        <input type="checkbox"
          id="Hiragana"
          value="Hiragana"
          checked={ kana.includes('Hiragana') ? "checked" : false }
          onChange={ e => actions.toggleKana(e.target.value) }
        />
        <label htmlFor="Hiragana" className="box kana">
          <span className="icon">あ</span>
          Hiragana
          <FontAwesomeIcon icon="check" className="check" />
        </label>

        <input type="checkbox"
          id="Katakana"
          value="Katakana"
          checked={ kana.includes('Katakana')  ? "checked" : false }
          onChange={ e => actions.toggleKana(e.target.value) }
        />
        <label htmlFor="Katakana" className="box kana">
          <span className="icon">ア</span>
          Katakana
          <FontAwesomeIcon icon="check" className="check" />
        </label>
      </div>
    )}
  </Consumer>

export default ChangeKana