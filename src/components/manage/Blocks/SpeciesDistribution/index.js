import SpeciesDistributionView from './View';
import getSchema from './schema';

export function getSpeciesDistributionURL(code_2000, isBird) {
  if (isBird) {
    return encodeURI(
      `https://bio.discomap.eea.europa.eu/arcgis/rest/services/Article_12/BirdsDirective_ART_12_version_2020_08_public_VM/MapServer/3/query?f=json&where=speciescode LIKE '%${code_2000.toUpperCase()}%'&returnGeometry=true&spatialRel=esriSpatialRelIntersects&outFields=speciescode&outSR=102100`,
    );
  }

  return encodeURI(
    `https://bio.discomap.eea.europa.eu/arcgis/rest/services/Article17/HabitatsDirective_ART_17_WMS_version_2020_08_public/MapServer/3/query?f=json&where=speciescode LIKE '%${code_2000.toUpperCase()}%'&returnGeometry=true&spatialRel=esriSpatialRelIntersects&outFields=speciescode&outSR=102100`,
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
