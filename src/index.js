/* eslint-disable no-extend-native */
// import React from 'react';
import loadable from '@loadable/component';

import { hashlink, localStorage } from './reducers';

// import installBubbleChart from './components/manage/Blocks/BubbleChart';
import installCarouselHorizontal from './components/manage/Blocks/CarouselHorizontal';
// import installCddaShape from './components/manage/Blocks/CddaShape';
// import installConnectedList from './components/manage/Blocks/List';
// import installContactBlock from './components/manage/Blocks/ContactBlock';
// import installExplodedPiesChart from './components/manage/Blocks/ExplodedPiesChart';
// import installExploreHabitats from './components/manage/Blocks/ExploreHabitats';
// import installExploreSites from './components/manage/Blocks/ExploreSites';
// import installExploreSpecies from './components/manage/Blocks/ExploreSpecies';
// import installHabitatClassification from './components/manage/Blocks/HabitatClassification';
// import installHabitatDistribution from './components/manage/Blocks/HabitatDistribution';
// import installHabitatProtectedSites from './components/manage/Blocks/HabitatProtectedSites';
// import installHabitatsBanner from './components/manage/Blocks/HabitatsBanner';
import installImageText from './components/manage/Blocks/ImageText';
import installLandingBlock from './components/manage/Blocks/Landing';
// import installNavigationAnchors from './components/manage/Blocks/NavigationAnchors';
// import installSimpleDataTable from './components/manage/Blocks/SimpleDataTable';
// import installSiteBanner from './components/manage/Blocks/SiteBanner';
// import installSiteHabitatsList from './components/manage/Blocks/SiteHabitatsList';
// import installSiteProtectedHabitats from './components/manage/Blocks/SiteProtectedHabitats';
// import installSiteProtectedSpecies from './components/manage/Blocks/SiteProtectedSpecies';
// import installSiteShape from './components/manage/Blocks/SiteShape';
// import installSiteSpeciesList from './components/manage/Blocks/SiteSpeciesList';
// import installSlateSvg from './components/manage/Blocks/SlateSVG';
// import installSpeciesBanner from './components/manage/Blocks/SpeciesBanner';
// import installSpeciesClassification from './components/manage/Blocks/SpeciesClassification';
// import installSpeciesDistribution from './components/manage/Blocks/SpeciesDistribution';
// import installSpeciesProtectedSites from './components/manage/Blocks/SpeciesProtectedSites';
// import installStackedBarChart from './components/manage/Blocks/StackedBarChart';
// import installTilesImages from './components/manage/Blocks/TilesImages';

import { gridSizes, variants } from './grid';

Array.prototype.sortByProperty = function (property, order = 'ASC') {
  return this.sort((a, b) => {
    if (a[property] < b[property]) return order === 'ASC' ? -1 : 1;
    if (a[property] > b[property]) return order === 'ASC' ? 1 : -1;
    return 0;
  });
};

const applyConfig = (config) => {
  // config.blocks.groupBlocksOrder = [
  //   ...config.blocks.groupBlocksOrder,
  //   { id: 'natura_2000', title: 'Natura 2000' },
  // ];

  config.addonReducers = {
    ...config.addonReducers,
    localStorage,
    hashlink,
  };

  config.settings.persistentReducers.push('localStorage');

  config.settings = {
    ...config.settings,
    n2k: {
      multilingualRoot: '/natura2000/:lang',
      multilingualPath: '/natura2000/:lang/*',
      defaultLanguage: 'en',
      supportedLanguages: [
        'bg',
        'hr',
        'cs',
        'da',
        'nl',
        'en',
        'et',
        'fi',
        'fr',
        'de',
        'el',
        'hu',
        'ga',
        'it',
        'lv',
        'lt',
        'mt',
        'pl',
        'pt',
        'ro',
        'sk',
        'sl',
        'es',
        'sv',
      ],
    },
  };

  // // config.settings.themes = {
  // //   ...(config.settings.themes || {}),
  // //   natura2000: {
  // //     Header: Header,
  // //     Footer: Footer,
  // //     Breadcrumbs: () => <></>,
  // //   },
  // // };

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

  // config.settings.loadables = {
  //   ...config.settings.loadables,
  //   d3: loadable.lib(() => import('d3')),
  // };

  return [
    // installBubbleChart,
    installCarouselHorizontal,
    // installCddaShape,
    // installConnectedList,
    // installContactBlock,
    // installExplodedPiesChart,
    // installExploreHabitats,
    // installExploreSites,
    // installExploreSpecies,
    // installHabitatClassification,
    // installHabitatDistribution,
    // installHabitatProtectedSites,
    // installHabitatsBanner,
    installImageText,
    installLandingBlock,
    // installNavigationAnchors,
    // installSimpleDataTable,
    // installSiteBanner,
    // installSiteHabitatsList,
    // installSiteProtectedHabitats,
    // installSiteProtectedSpecies,
    // installSiteShape,
    // installSiteSpeciesList,
    // installSlateSvg,
    // installSpeciesBanner,
    // installSpeciesClassification,
    // installSpeciesDistribution,
    // installSpeciesProtectedSites,
    // installStackedBarChart,
    // installTilesImages,
  ].reduce((acc, apply) => apply(acc), config);
};

export default applyConfig;
