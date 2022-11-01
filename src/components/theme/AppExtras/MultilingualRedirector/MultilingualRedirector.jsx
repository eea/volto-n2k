import React from 'react';
import { Redirect } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import cookie from 'react-cookie';
import config from '@plone/volto/registry';
import { changeLanguage } from '@plone/volto/actions';

const MultilingualRedirector = (props) => {
  const { settings } = config;
  const { pathname, children } = props;
  const currentLanguage =
    cookie.load('N2K_LANGUAGE') || settings.n2k.defaultLanguage;
  const redirectToLanguage = settings.n2k.supportedLanguages.includes(
    currentLanguage,
  )
    ? currentLanguage
    : settings.n2k.defaultLanguage;
  const dispatch = useDispatch();

  React.useEffect(() => {
    if (settings.isMultilingual && pathname === '/') {
      import('~/../locales/' + redirectToLanguage + '.json').then((locale) => {
        dispatch(changeLanguage(redirectToLanguage, locale.default));
      });
    }
  }, [pathname, dispatch, redirectToLanguage, settings.isMultilingual]);

  return pathname === '/' && settings.isMultilingual ? (
    <Redirect to={`/${redirectToLanguage}`} />
  ) : (
    <>{children}</>
  );
};

export default MultilingualRedirector;
