import React from 'react';
import { BodyClass } from '@plone/volto/helpers';

const View = (props) => {
  return (
    <>
      {props.mode === 'edit' ? <p>Body className: {props.data.class}</p> : ''}
      <BodyClass className={props.data.class.trim() || ''} />
    </>
  );
};

export default View;
