/* eslint-disable no-extend-native */
import React from 'react';

import localStorage from './store';

import installAppExtras from './components/theme/AppExtras';
import installBodyClass from './components/manage/Blocks/BodyClass';
import installCarouselHorizontal from './components/manage/Blocks/CarouselHorizontal';
import installCddaShape from './components/manage/Blocks/CddaShape';
import installContactBlock from './components/manage/Blocks/ContactBlock';
import installExplodedPiesChart from './components/manage/Blocks/ExplodedPiesChart';
import installHabitatsBanner from './components/manage/Blocks/HabitatsBanner';
import installImageText from './components/manage/Blocks/ImageText';
import installLandingBlock from './components/manage/Blocks/Landing';
import installNavigationAnchors from './components/manage/Blocks/NavigationAnchors';
import installSimpleDataTable from './components/manage/Blocks/SimpleDataTable';
import installSiteBanner from './components/manage/Blocks/SiteBanner';
import installSiteProtectedHabitats from './components/manage/Blocks/SiteProtectedHabitats';
import installSiteProtectedSpecies from './components/manage/Blocks/SiteProtectedSpecies';
import installSiteShape from './components/manage/Blocks/SiteShape';
import installSiteSpeciesList from './components/manage/Blocks/SiteSpeciesList';
import installSpeciesDistribution from './components/manage/Blocks/SpeciesDistribution';
import installSpeciesBanner from './components/manage/Blocks/SpeciesBanner';
import installTilesImages from './components/manage/Blocks/TilesImages';
import { LinkElement } from './components/manage/Blocks/SlateLink/render';

import { LINK } from 'volto-slate/constants';

import { Header, Footer } from '@eeacms/volto-n2k/components';

import { gridSizes, variants } from './grid';

import './less/styles.less';

Array.prototype.sortByProperty = function (property, order = 'ASC') {
  return this.sort((a, b) => {
    if (a[property] < b[property]) return order === 'ASC' ? -1 : 1;
    if (a[property] > b[property]) return order === 'ASC' ? 1 : -1;
    return 0;
  });
};

const applyConfig = (config) => {
  config.blocks.groupBlocksOrder = [
    ...config.blocks.groupBlocksOrder,
    { id: 'natura_2000', title: 'Natura 2000' },
  ];

  config.addonReducers = {
    ...config.addonReducers,
    localStorage,
  };

  config.settings.persistentReducers.push('localStorage');

  config.settings = {
    ...config.settings,
    multilingualRoot: '/natura2000/:lang',
    multilingualPath: '/natura2000/:lang/*',
    defaultLanguage: 'en',
    supportedLanguages: ['en', 'ro'],
  };

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

  config.settings.slate.elements[LINK] = LinkElement;

  return [
    installAppExtras,
    installBodyClass,
    installCarouselHorizontal,
    installCddaShape,
    installContactBlock,
    installExplodedPiesChart,
    installHabitatsBanner,
    installImageText,
    installLandingBlock,
    installNavigationAnchors,
    installSimpleDataTable,
    installSiteBanner,
    installSiteProtectedHabitats,
    installSiteProtectedSpecies,
    installSiteShape,
    installSiteSpeciesList,
    installSpeciesDistribution,
    installSpeciesBanner,
    installTilesImages,
  ].reduce((acc, apply) => apply(acc), config);
};

export default applyConfig;
