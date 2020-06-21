import React from 'react'
import { Consumer } from './../../context'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

const ChangeKana = () =>
  <Consumer>
    { ({ kana, actions }) => (
      <div className="options">
        <div className="options__box options__box__character">
          <input type="checkbox"
            id="Hiragana"
            value="Hiragana"
            checked={ kana.includes('Hiragana') }
            onChange={ e => actions.toggleKana(e.target.value) }
          />
          <label htmlFor="Hiragana" className="options__box__character__label kana">
            <span className="options__box__character__icon">あ</span>
            Hiragana
            <FontAwesomeIcon icon="check" className="options__box__check" />
          </label>

          <input type="checkbox"
            id="HiraganaCombos"
            value="HiraganaCombos"
            checked={ kana.includes('HiraganaCombos')}
            onChange={ e => actions.toggleKana(e.target.value) }
            className="options__sub__checkbox__input"
          />
          <label className="options__sub" htmlFor="HiraganaCombos">
            <div className="options__sub__checkbox">
              <FontAwesomeIcon icon="check" className="options__sub__checkbox__check" />
            </div>
            Combos
          </label>
        </div>

        <div className="options__box options__box__character">
          <input type="checkbox"
            id="Katakana"
            value="Katakana"
            checked={ kana.includes('Katakana') }
            onChange={ e => actions.toggleKana(e.target.value) }
          />
          <label htmlFor="Katakana" className="options__box__character__label kana">
            <span className="options__box__character__icon">ア</span>
            Katakana
            <FontAwesomeIcon icon="check" className="options__box__check" />
          </label>

          <input type="checkbox"
            id="KatakanaCombos"
            value="KatakanaCombos"
            checked={ kana.includes('KatakanaCombos')}
            onChange={ e => actions.toggleKana(e.target.value) }
            className="options__sub__checkbox__input"
          />
          <label className="options__sub" htmlFor="KatakanaCombos">
            <div className="options__sub__checkbox">
              <FontAwesomeIcon icon="check" className="options__sub__checkbox__check" />
            </div>
            Combos
          </label>
        </div>
      </div>
    )}
  </Consumer>

export default ChangeKana