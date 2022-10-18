/**
 * Language selector component.
 * @module components/LanguageSelector/LanguageSelector
 */

import React from 'react';
import { withRouter, matchPath, generatePath } from 'react-router';
import { useSelector } from 'react-redux';
import cx from 'classnames';
import { langmap } from '@plone/volto/helpers';
import { flattenToAppURL } from '@plone/volto/helpers';
import { Dropdown } from 'semantic-ui-react';
import config from '@plone/volto/registry';
import { withLocalStorage } from '@eeacms/volto-n2k/hocs';
import { getN2kItems, pathExists } from '@eeacms/volto-n2k/helpers';
import './styles.less';

const LanguageSelector = (props) => {
  const { settings } = config;
  const content = useSelector((state) => state.content);
  const n2kItems = getN2kItems(props.navigation.items);
  const localStorage = props.localStorage;
  const pathname = props.location.pathname;
  const currentLang = localStorage.get('N2K_LANGUAGE');
  const matchRoot = matchPath(pathname, {
    path: settings.multilingualRoot,
    exact: true,
    strict: false,
  });
  const matchChild = matchPath(pathname, {
    path: settings.multilingualPath,
    exact: true,
    strict: false,
  });
  const match = matchRoot || matchChild;
  const hasMultilingualSupport =
    match && settings.supportedLanguages.includes(match.params.lang);
  const translations = hasMultilingualSupport
    ? settings.supportedLanguages.map((lang) => {
        return {
          path: matchRoot
            ? `/natura2000/${lang}`
            : generatePath(settings.multilingualPath, {
                ...match.params,
                lang,
              }),
          lang,
        };
      })
    : [];
  const supportedLanguagesOptions = settings.supportedLanguages.map((lang) => ({
    key: lang,
    value: lang,
    text: langmap[lang].nativeName,
  }));

  return (
    <div className={cx('language-selector', props.className)}>
      <Dropdown
        aria-label="Language selector"
        disabled={content.get.loading}
        placeholder="Select a language"
        value={currentLang}
        scrolling
        options={supportedLanguagesOptions}
        onChange={(e, data) => {
          const lang = data.value;
          const translation = translations.filter(
            (item) => item.lang === lang,
          )[0];

          if (translation && translation.path) {
            const exists = pathExists(translation.path, n2kItems);
            if (exists) {
              props.history.push(flattenToAppURL(translation.path));
            } else {
              props.history.push('/natura2000');
            }
          }

          if (config.settings.supportedLanguages.includes(lang)) {
            localStorage.set('N2K_LANGUAGE', lang);
          }
        }}
      />
    </div>
  );
};

export default withRouter(withLocalStorage(LanguageSelector));
