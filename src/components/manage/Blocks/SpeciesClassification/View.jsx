import React from 'react';
// import { UniversalLink } from '@plone/volto/components';
import './style.less';

const View = (props) => {
  // const provider_data = props.provider_data || {};
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
