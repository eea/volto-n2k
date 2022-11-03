import React from 'react';
import { connect } from 'react-redux';
import { setHashLink, resetHashLink } from '@eeacms/volto-n2k/actions/hashlink';

export default function withHashLink(WrappedComponent) {
  return connect(
    (state) => {
      return {
        hashlink: state.hashlink,
      };
    },
    { setHashLink, resetHashLink },
  )((props) => {
    return (
      <WrappedComponent
        {...props}
        setHashLink={props.setHashLink}
        resetHashLink={props.resetHashLink}
      />
    );
  });
}
