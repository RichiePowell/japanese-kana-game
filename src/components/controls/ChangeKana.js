import React from 'react';

const ChangeKana = ({handleKanaChange}) => {
  return (
    <select
      onChange={ (e) => handleKanaChange(e.target.value) }
      className="kana"
    >
      <option value="both">Both</option>
      <option value="hiragana">Hiragana</option>
      <option value="katakana">Katakana</option>
    </select>
  );
}

export default ChangeKana;