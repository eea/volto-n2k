/**
 * Language selector component.
 * @module components/LanguageSelector/LanguageSelector
 */

import React from 'react';
import { withRouter, matchPath, generatePath } from 'react-router';
import { useSelector } from 'react-redux';
import langmap from 'langmap';
import { flattenToAppURL } from '@plone/volto/helpers';
import { Dropdown } from 'semantic-ui-react';
import config from '@plone/volto/registry';
import { withLocalStorage } from '@eeacms/volto-n2k/hocs';
import './styles.less';

const LanguageSelector = (props) => {
  const content = useSelector((state) => state.content);
  const [open, setOpen] = React.useState(false);
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
    text: langmap[lang].nativeName,
  }));

  return (
    <div className="language-selector">
      <Dropdown
        disabled={content.get.loading}
        placeholder="Select a language"
        value={currentLang}
        scrolling
        open={open}
        options={supportedLanguagesOptions}
        onClick={() => {
          setOpen(!open);
        }}
        onChange={(e, data) => {
          const lang = data.value;
          const translation = translations.filter(
            (item) => item.lang === lang,
          )[0];

          if (translation && translation.path) {
            props.history.push(flattenToAppURL(translation.path));
          }

          if (config.settings.supportedLanguages.includes(lang)) {
            localStorage.set('N2K_LANGUAGE', lang);
          }

          setOpen(false);
        }}
      />
    </div>
  );
};

export default withRouter(withLocalStorage(LanguageSelector));
