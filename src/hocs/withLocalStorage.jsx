import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  setLocalStorage,
  deleteLocalStorage,
  resetLocalStorage,
} from '@eeacms/volto-n2k/actions';

export default function withLanguage(WrappedComponent) {
  return (props) => {
    const dispatch = useDispatch();
    const localStorage = useSelector((state) => state.localStorage);

    const get = (key) => {
      return localStorage[key];
    };

    const set = (key, value) => {
      dispatch(setLocalStorage(key, value));
    };

    const remove = (key) => {
      dispatch(deleteLocalStorage(key));
    };

    const reset = () => {
      dispatch(resetLocalStorage());
    };

    return (
      <WrappedComponent
        {...props}
        localStorage={{ ...localStorage, get, set, remove, reset }}
      />
    );
  };
}
