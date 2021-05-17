import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import cookies from 'react-cookie';
import { setCookie } from '@eeacms/volto-n2k/actions';

export default function withCookies(WrappedComponent) {
  return (props) => {
    const dispatch = useDispatch();
    const state = useSelector((state) => state.cookies);

    const get = (key, defaultValue) => {
      if (!state[key]) {
        dispatch(setCookie(key, cookies.load(key) || defaultValue));
        if (!cookies.load(key)) {
          cookies.save(key, defaultValue);
        }
      }
      return state[key];
    };

    const set = (key, value) => {
      cookies.save(key, value);
      dispatch(setCookie(key, value));
    };

    return <WrappedComponent {...props} cookies={{ get, set }} />;
  };
}
