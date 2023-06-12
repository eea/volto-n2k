/* eslint-disable no-extend-native */
import loadable from '@loadable/component';
import { compose } from 'redux';
import { connectToProviderData } from '@eeacms/volto-datablocks/hocs';

import { hashlink, localStorage } from './reducers';

import installAppExtras from './components/theme/AppExtras';

import { LinkElement } from './components/manage/Blocks/SlateLink/render';
import installBodyClass from './components/manage/Blocks/BodyClass';
import installBubbleChart from './components/manage/Blocks/BubbleChart';
import installCarouselHorizontal from './components/manage/Blocks/CarouselHorizontal';
import installCddaShape from './components/manage/Blocks/CddaShape';
import installConnectedList from './components/manage/Blocks/List';
import installConnectedStatusList from './components/manage/Blocks/StatusList';
import installConnectedLabeledList from './components/manage/Blocks/LabeledList';
import installConnectedLinkList from './components/manage/Blocks/ConnectedLinkList';
import installContactBlock from './components/manage/Blocks/ContactBlock';
import installExplodedPiesChart from './components/manage/Blocks/ExplodedPiesChart';
import installExploreHabitats from './components/manage/Blocks/ExploreHabitats';
import installExploreSites from './components/manage/Blocks/ExploreSites';
import installExploreSpecies from './components/manage/Blocks/ExploreSpecies';
import installHabitatClassification from './components/manage/Blocks/HabitatClassification';
import installHabitatDistribution from './components/manage/Blocks/HabitatDistribution';
import installHabitatProtectedSites from './components/manage/Blocks/HabitatProtectedSites';
import installHabitatsBanner from './components/manage/Blocks/HabitatsBanner';
import installImageText from './components/manage/Blocks/ImageText';
import installLandingBlock from './components/manage/Blocks/Landing';
import installNavigationAnchors from './components/manage/Blocks/NavigationAnchors';
import installSimpleDataTable from './components/manage/Blocks/SimpleDataTable';
import installSiteBanner from './components/manage/Blocks/SiteBanner';
import installSiteHabitatsList from './components/manage/Blocks/SiteHabitatsList';
import installSiteProtectedHabitats from './components/manage/Blocks/SiteProtectedHabitats';
import installSiteProtectedSpecies from './components/manage/Blocks/SiteProtectedSpecies';
import installSiteShape from './components/manage/Blocks/SiteShape';
import installSiteSpeciesList from './components/manage/Blocks/SiteSpeciesList';
import installSlateSvg from './components/manage/Blocks/SlateSVG';
import installSpeciesBanner from './components/manage/Blocks/SpeciesBanner';
import installSpeciesClassification from './components/manage/Blocks/SpeciesClassification';
import installSpeciesDistribution from './components/manage/Blocks/SpeciesDistribution';
import installSpeciesProtectedSites from './components/manage/Blocks/SpeciesProtectedSites';
import installStackedBarChart from './components/manage/Blocks/StackedBarChart';
import installTilesImages from './components/manage/Blocks/TilesImages';
import installN2KCountryProfileMap from './components/manage/Blocks/N2KCountryProfileMap';
import installCDDACountryProfileMap from './components/manage/Blocks/CDDACountryProfileMap';

import { LINK } from '@plone/volto-slate/constants';

import { gridSizes, variants } from './grid';

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
    hashlink,
  };

  config.settings.persistentReducers.push('localStorage');

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

  config.blocks.blocksConfig.group = {
    ...(config.blocks.blocksConfig.group || {}),
    conditions: {
      bird: compose(
        connectToProviderData((props) => ({
          provider_url: '/data/natura-2000-species',
        })),
      )(({ children, provider_data }) => {
        if (
          provider_data?.species_group_name?.[0] &&
          provider_data?.species_group_name?.[0] === 'Birds'
        ) {
          return children;
        }
        return null;
      }),
      species: compose(
        connectToProviderData((props) => ({
          provider_url: '/data/natura-2000-species',
        })),
      )(({ children, provider_data }) => {
        if (
          provider_data?.species_group_name?.[0] &&
          provider_data?.species_group_name?.[0] !== 'Birds'
        ) {
          return children;
        }
        return null;
      }),
    },
  };

  config.settings.slate.elements[LINK] = LinkElement;

  config.settings.loadables = {
    ...config.settings.loadables,
    d3: loadable.lib(() => import('d3')),
  };

  return [
    installAppExtras,
    installBodyClass,
    installBubbleChart,
    installCarouselHorizontal,
    installCddaShape,
    installConnectedList,
    installConnectedStatusList,
    installConnectedLabeledList,
    installConnectedLinkList,
    installContactBlock,
    installExplodedPiesChart,
    installExploreHabitats,
    installExploreSites,
    installExploreSpecies,
    installHabitatClassification,
    installHabitatDistribution,
    installHabitatProtectedSites,
    installHabitatsBanner,
    installImageText,
    installLandingBlock,
    installNavigationAnchors,
    installSimpleDataTable,
    installSiteBanner,
    installSiteHabitatsList,
    installSiteProtectedHabitats,
    installSiteProtectedSpecies,
    installSiteShape,
    installSiteSpeciesList,
    installSlateSvg,
    installSpeciesBanner,
    installSpeciesClassification,
    installSpeciesDistribution,
    installSpeciesProtectedSites,
    installStackedBarChart,
    installTilesImages,
    installN2KCountryProfileMap,
    installCDDACountryProfileMap,
  ].reduce((acc, apply) => apply(acc), config);
};

export default applyConfig;
