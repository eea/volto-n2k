import HabitatProtectedSitesView from './View';
import getSchema from './schema';

export function getHabitatProtectedSitesURL(code_2000) {
  return encodeURI(
    `https://bio.discomap.eea.europa.eu/arcgis/rest/services/ProtectedSites/EUNIS_Website_Dyna_WM/MapServer/3/query?f=json&where=HABITATCODE LIKE '%${code_2000.toUpperCase()}%'&returnGeometry=true&spatialRel=esriSpatialRelIntersects&outFields=SPECIESCODE,SITECODE,HABITATCODE,OBJECTID&outSR=102100`,
  );
}

export default (config) => {
  config.blocks.blocksConfig.custom_connected_block = {
    ...config.blocks.blocksConfig.custom_connected_block,
    blocks: {
      ...config.blocks.blocksConfig.custom_connected_block.blocks,
      habitat_protected_sites: {
        view: HabitatProtectedSitesView,
        getSchema: getSchema,
        title: 'Habitat protectes sites map',
      },
    },
  };
  return config;
};
