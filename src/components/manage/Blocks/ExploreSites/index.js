import ExploreSitesEdit from './Edit';
import ExploreSitesView from './View';

import worldSVG from '@plone/volto/icons/world.svg';

export function getActiveSitesURL(site_codes) {
  return encodeURI(
    `https://bio.discomap.eea.europa.eu/arcgis/rest/services/ProtectedSites/Natura2000Sites/MapServer/2/query?f=json&where=SITECODE IN (${site_codes.join(
      ',',
    )})&returnGeometry=true&spatialRel=esriSpatialRelIntersects&outFields=OBJECTID&outSR=102100`,
  );
}

export default (config) => {
  config.blocks.blocksConfig.explore_sites_map = {
    id: 'explore_sites_map',
    title: 'Explore sites map',
    icon: worldSVG,
    group: 'natura_2000',
    edit: ExploreSitesEdit,
    view: ExploreSitesView,
  };
  return config;
};
