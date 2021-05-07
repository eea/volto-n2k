import React from 'react';

import installCarouselHorizontal from './components/manage/Blocks/CarouselHorizontal';
import installBodyClass from './components/manage/Blocks/BodyClass';
import installLandingBlock from './components/manage/Blocks/Landing';
import installNavigationAnchors from './components/manage/Blocks/NavigationAnchors';
import installImageText from './components/manage/Blocks/ImageText';
import installTilesImages from './components/manage/Blocks/TilesImages';
import installExplodedPiesChart from './components/manage/Blocks/ExplodedPiesChart';
import installSiteBanner from './components/manage/Blocks/SiteBanner';
import installSiteProtectedSpecies from './components/manage/Blocks/SiteProtectedSpecies';
import installSiteProtectedHabitats from './components/manage/Blocks/SiteProtectedHabitats';
import installSiteSpeciesList from './components/manage/Blocks/SiteSpeciesList';
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
    installBodyClass,
    installLandingBlock,
    installNavigationAnchors,
    installExplodedPiesChart,
    installSiteBanner,
    installSiteProtectedSpecies,
    installSiteProtectedHabitats,
    installSiteSpeciesList,
    installAppExtras,
    installImageText,
    installTilesImages,
  ].reduce((acc, apply) => apply(acc), config);
};

export default applyConfig;
