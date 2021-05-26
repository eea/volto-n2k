import SpeciesDistributionView from './View';
import getSchema from './schema';

export function getSpeciesDistributionURL(code_2000) {
  return encodeURI(
    `https://bio.discomap.eea.europa.eu/arcgis/rest/services/ProtectedSites/Natura2000Species/MapServer/0/query?f=json&where=(SpeciesCode LIKE '%${code_2000.toUpperCase()}%') AND (NaturaSitePolygon_WM_Public_SITECODE IS NOT null)&returnGeometry=true&spatialRel=esriSpatialRelIntersects&outFields=SpeciesCode&outSR=102100`,
  );
}

export default (config) => {
  config.blocks.blocksConfig.custom_connected_block = {
    ...config.blocks.blocksConfig.custom_connected_block,
    blocks: {
      ...config.blocks.blocksConfig.custom_connected_block.blocks,
      species_distribution: {
        view: SpeciesDistributionView,
        getSchema: getSchema,
        title: 'Species distribution map',
      },
    },
  };
  return config;
};
