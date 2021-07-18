import ExploreSpeciesEdit from './Edit';
import ExploreSpeciesView from './View';

import worldSVG from '@plone/volto/icons/world.svg';

export function getActiveSpeciesURL(site_codes) {
  return encodeURI(
    `https://bio.discomap.eea.europa.eu/arcgis/rest/services/Article17/HabitatsDirective_ART_17_WMS_version_2020_08_public/MapServer/3/query?f=json&where=speciescode IN (${site_codes.join(
      ',',
    )})&returnGeometry=true&spatialRel=esriSpatialRelIntersects&outFields=OBJECTID,speciescode&outSR=102100`,
  );
}

export default (config) => {
  config.blocks.blocksConfig.explore_species_map = {
    id: 'explore_species_map',
    title: 'Explore species map',
    icon: worldSVG,
    group: 'natura_2000',
    edit: ExploreSpeciesEdit,
    view: ExploreSpeciesView,
  };
  return config;
};
