import ExploreHabitatsEdit from './Edit';
import ExploreHabitatsView from './View';

import worldSVG from '@plone/volto/icons/world.svg';

export function getActiveHabitatsURL(code_2000) {
  return encodeURI(
    `https://bio.discomap.eea.europa.eu/arcgis/rest/services/Article17/HabitatsDirective_ART_17_WMS_version_2020_08_public/MapServer/1/query?f=json&where=habitatcode IN (${code_2000.join(
      ',',
    )})&returnGeometry=true&spatialRel=esriSpatialRelIntersects&outFields=OBJECTID,habitatcode&outSR=102100`,
  );
}

export default function applyConfig(config) {
  config.blocks.blocksConfig.explore_habitats_map = {
    id: 'explore_habitats_map',
    title: 'Explore habitats map',
    icon: worldSVG,
    group: 'natura_2000',
    edit: ExploreHabitatsEdit,
    view: ExploreHabitatsView,
  };
  return config;
}
