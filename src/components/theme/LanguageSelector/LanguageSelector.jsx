/**
 * Language selector component.
 * @module components/LanguageSelector/LanguageSelector
 */

import React from 'react';
import { withRouter } from 'react-router';
import cookie from 'react-cookie';

import { useSelector } from 'react-redux';

import langmap from 'langmap';
import { flattenToAppURL } from '@plone/volto/helpers';

import { Dropdown } from 'semantic-ui-react';

import config from '@plone/volto/registry';

const LanguageSelector = (props) => {
  const currentLang =
    cookie.load('N2K_LANGUAGE') || config.settings.defaultLanguage;
  const translations = useSelector((state) => state.content.data?.relatedItems);
  const { settings } = config;
  const supportedLanguagesOptions = settings.supportedLanguages.map((lang) => ({
    key: lang,
    value: lang,
    text: langmap[lang].nativeName,
  }));

  return (
    <div className="language-selector">
      <Dropdown
        placeholder="select_lang"
        value={currentLang}
        scrolling
        options={supportedLanguagesOptions}
        onChange={(e, data) => {
          const lang = data.value;
          const translation = translations.filter((item) =>
            item['@id'].includes(`/${lang}/`),
          )[0];

          if (translation) {
            props.history.push(flattenToAppURL(translation['@id']))
          }

          if (config.settings.supportedLanguages.includes(lang)) {
            cookie.save('N2K_LANGUAGE', lang);
          }
        }}
      />
    </div>
  );
};

export default withRouter(LanguageSelector);
