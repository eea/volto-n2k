import React from 'react';

import installExplodedPieChart from './components/manage/Blocks/ExplodedPieChart';

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

  return [installExplodedPieChart].reduce((acc, apply) => apply(acc), config);
};

export default applyConfig;
