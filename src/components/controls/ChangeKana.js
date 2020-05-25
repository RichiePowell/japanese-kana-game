import React from 'react';

const ChangeKana = ({handleKanaChange}) => {

  const selectKana = React.useRef();

  return (
    <select
      onChange={ () => handleKanaChange(selectKana.current.value) }
      className="kana"
      ref={selectKana}
    >
      <option value="both">Both</option>
      <option value="hiragana">Hiragana</option>
      <option value="katakana">Katakana</option>
    </select>
  );
}

export default ChangeKana;