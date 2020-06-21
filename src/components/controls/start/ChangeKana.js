import React from 'react'
import { Consumer } from './../../context'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

const ChangeKana = () =>
  <Consumer>
    { ({ kana, actions }) => (
      <div className="options">
        <div className="options__box">
          <input type="checkbox"
            id="Hiragana"
            value="Hiragana"
            checked={ kana.includes('Hiragana') }
            onChange={ e => actions.toggleKana(e.target.value) }
          />
          <label htmlFor="Hiragana" className="options__box__label kana">
            <span className="options__icon">あ</span>
            Hiragana
            <FontAwesomeIcon icon="check" className="options__box__check" />
          </label>
          <FontAwesomeIcon icon="check" className="check" />
        </label>
        </div>

        <div className="options__box">
          <input type="checkbox"
            id="Katakana"
            value="Katakana"
            checked={ kana.includes('Katakana') }
            onChange={ e => actions.toggleKana(e.target.value) }
          />
          <label htmlFor="Katakana" className="options__box__label kana">
            <span className="options__icon">ア</span>
            Katakana
            <FontAwesomeIcon icon="check" className="options__box__check" />
          </label>
          <FontAwesomeIcon icon="check" className="check" />
        </label>
      </div>
      </div>
    )}
  </Consumer>

export default ChangeKana