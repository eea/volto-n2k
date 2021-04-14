import React from 'react';

import installCarouselHorizontal from './components/manage/Blocks/CarouselHorizontal';
import installLandingBlock from './components/manage/Blocks/Landing';
import installNavigationAnchors from './components/manage/Blocks/NavigationAnchors';
import installExplodedPiesChart from './components/manage/Blocks/ExplodedPiesChart';
import installSiteBanner from './components/manage/Blocks/SiteBanner';
import installProtectedSpecies from './components/manage/Blocks/ProtectedSpecies';
import installAppExtras from './components/theme/AppExtras';

import { Header, Footer } from '@eeacms/volto-n2k/components';

import { gridSizes, variants } from './grid';

import './less/styles.less';

const applyConfig = (config) => {
  config.blocks.groupBlocksOrder = [
    ...config.blocks.groupBlocksOrder,
    { id: 'natura_2000', title: 'Natura 2000' },
  ];

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

  return [
    installCarouselHorizontal,
    installLandingBlock,
    installNavigationAnchors,
    installExplodedPiesChart,
    installSiteBanner,
    installProtectedSpecies,
    installAppExtras,
  ].reduce((acc, apply) => apply(acc), config);
};

export default applyConfig;
