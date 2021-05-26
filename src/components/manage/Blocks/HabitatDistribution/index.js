import HabitatDistributionView from './View';
import getSchema from './schema';

export function getHabitatDistributionURL(code_2000) {
  return encodeURI(
    `https://bio.discomap.eea.europa.eu/arcgis/rest/services/ProtectedSites/Natura2000Habitats/MapServer/0/query?f=json&where=HABITATCODE LIKE '%${code_2000.toUpperCase()}%'&returnGeometry=true&spatialRel=esriSpatialRelIntersects&outFields=SITECODE,HABITATCODE,OBJECTID&outSR=102100`,
  );
}

export default (config) => {
  config.blocks.blocksConfig.custom_connected_block = {
    ...config.blocks.blocksConfig.custom_connected_block,
    blocks: {
      ...config.blocks.blocksConfig.custom_connected_block.blocks,
      habitat_distribution: {
        view: HabitatDistributionView,
        getSchema: getSchema,
        title: 'Habitat distribution map',
      },
    },
  };
  return config;
};
