import HabitatDistributionView from './View';
import getSchema from './schema';

export function getHabitatDistributionURL(code_2000) {
  return encodeURI(
    `https://bio.discomap.eea.europa.eu/arcgis/rest/services/Article17/HabitatsDirective_ART_17_WMS_version_2020_08_public/MapServer/1/query?f=json&where=habitatcode LIKE '%${code_2000.toUpperCase()}%'&returnGeometry=true&spatialRel=esriSpatialRelIntersects&outFields=habitatcode,OBJECTID&outSR=102100`,
  );
}

export default function applyConfig(config) {
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
}
