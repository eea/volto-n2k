import React from 'react';

import installExplodedPiesChart from './components/manage/Blocks/ExplodedPiesChart';
import installAppExtras from './components/theme/AppExtras';

import { Header, Footer } from '@eeacms/volto-n2k/components';

import { gridSizes, variants } from './grid';

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

  config.blocks.blocksConfig.columnsBlock = {
    ...(config.blocks.blocksConfig.columnsBlock || {}),
    gridSizes: {
      ...(config.blocks.blocksConfig.columnsBlock?.gridSizes || {}),
      ...gridSizes,
    },
    variants: [
      ...(config.blocks.blocksConfig.columnsBlock?.variants || []),
      ...variants,
    ],
  };

  return [installExplodedPiesChart, installAppExtras].reduce(
    (acc, apply) => apply(acc),
    config,
  );
};

export default applyConfig;
