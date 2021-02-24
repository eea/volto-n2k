import React from 'react';

import installExplodedPiesChart from './components/manage/Blocks/ExplodedPiesChart';

import { Header, Footer } from '@eeacms/volto-n2k/components';

import './styles.less';

const applyConfig = (config) => {
  config.settings.themes = {
    ...(config.settings.themes || {}),
    n2k: {
      Header: Header,
      Footer: Footer,
      Breadcrumbs: () => <></>,
    },
  };

  return [installExplodedPiesChart].reduce((acc, apply) => apply(acc), config);
};

export default applyConfig;
