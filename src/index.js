import React from 'react';

import installCarouselHorizontal from './components/manage/Blocks/CarouselHorizontal';
import installExplodedPiesChart from './components/manage/Blocks/ExplodedPiesChart';
import installAppExtras from './components/theme/AppExtras';

import { Header } from '@eeacms/volto-n2k/components';

import { gridSizes, variants } from './grid';

import './less/styles.less';

const applyConfig = (config) => {
  config.settings.themes = {
    ...(config.settings.themes || {}),
    natura2000: {
      Header: Header,
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

  return [
    installCarouselHorizontal,
    installExplodedPiesChart,
    installAppExtras,
  ].reduce((acc, apply) => apply(acc), config);
};

export default applyConfig;
