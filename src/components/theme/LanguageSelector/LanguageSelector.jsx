/**
 * Language selector component.
 * @module components/LanguageSelector/LanguageSelector
 */

import React from 'react';
import { withRouter, matchPath, generatePath } from 'react-router';
import { useSelector } from 'react-redux';
// import langmap from 'langmap';
import { flattenToAppURL } from '@plone/volto/helpers';
import { Dropdown } from 'semantic-ui-react';
import config from '@plone/volto/registry';
import { withLocalStorage } from '@eeacms/volto-n2k/hocs';
import { getN2kItems, pathExists } from '@eeacms/volto-n2k/helpers';
import './styles.less';

const LanguageSelector = (props) => {
  const content = useSelector((state) => state.content);
  const n2kItems = getN2kItems(props.navigation.items);
  const localStorage = props.localStorage;
  const pathname = props.location.pathname;
  const currentLang = localStorage.get('N2K_LANGUAGE');
  const match = matchPath(pathname, {
    path: config.settings.multilingualPath,
    exact: true,
    strict: false,
  });
  const hasMultilingualSupport =
    match && config.settings.supportedLanguages.includes(match.params.lang);
  const translations = hasMultilingualSupport
    ? config.settings.supportedLanguages.map((lang) => ({
        path: generatePath(config.settings.multilingualPath, {
          ...match.params,
          lang,
        }),
        lang,
      }))
    : [];
  const { settings } = config;
  const supportedLanguagesOptions = settings.supportedLanguages.map((lang) => ({
    key: lang,
    value: lang,
    text: lang,
  }));

  return (
    <div className="language-selector">
      <Dropdown
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

            console.log('HERE', exists, translation.path, n2kItems);

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
