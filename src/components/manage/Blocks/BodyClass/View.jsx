import React from 'react';
import { BodyClass } from '@plone/volto/helpers';

const View = (props) => {
  const { data } = props;
  return (
    <>
      {props.mode === 'edit' ? <p>Body className: {props.data.class}</p> : ''}
      <BodyClass className={data.class ? data.class.trim() : ''} />
    </>
  );
};

export default View;
