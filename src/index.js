import React from 'react';

import installExplodedPiesChart from './components/manage/Blocks/ExplodedPiesChart';

import { Header, Footer } from '@eeacms/volto-n2k/components';
import { withScrollToHash } from '@eeacms/volto-n2k/hocs';

import './styles.less';

const applyConfig = (config) => {
  config.settings.themes = {
    ...(config.settings.themes || {}),
    natura2000: {
      Header: Header,
      Footer: Footer,
      Breadcrumbs: () => <></>,
    },
  };

  config.settings.appExtras = [
    ...(config.settings.appExtras || []),
    {
      match: '',
      component: withScrollToHash(() => {
        return <React.Fragment />;
      }),
    },
  ];

  return [installExplodedPiesChart].reduce((acc, apply) => apply(acc), config);
};

export default applyConfig;
