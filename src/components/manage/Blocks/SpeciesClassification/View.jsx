import React from 'react';
import './style.less';

const View = (props) => {
  return (
    <div className="species-classification">
      {props.mode === 'edit' ? <p>Species classification</p> : ''}
      {/* {Array(Math.max(0, rows))
        .fill()
        .map((_, row) => (
         
        ))} */}
    </div>
  );
};

export default View;
