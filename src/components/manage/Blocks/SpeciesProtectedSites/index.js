import SpeciesProtectedSitesView from './View';
import getSchema from './schema';

export function getSpeciesProtectedSitesURL(code_2000, layers) {
  const baseUrl =
    'https://bio.discomap.eea.europa.eu/arcgis/rest/services/ProtectedSites/EUNIS_Website_Dyna_WM/MapServer';
  const queryParams = encodeURI(
    `?f=json&where=SPECIESCODE LIKE '%${code_2000.toUpperCase()}%'&returnGeometry=true&spatialRel=esriSpatialRelIntersects&outFields=SPECIESCODE,SITECODE,HABITATCODE,OBJECTID&outSR=102100`,
  );

  return layers.reduce((acc, layer) => {
    acc[`layer${layer}`] = `${baseUrl}/${layer}/query${queryParams}`;
    return acc;
  }, {});
}

export default function applyConfig(config) {
  config.blocks.blocksConfig.custom_connected_block = {
    ...config.blocks.blocksConfig.custom_connected_block,
    blocks: {
      ...config.blocks.blocksConfig.custom_connected_block.blocks,
      species_protected_sites: {
        view: SpeciesProtectedSitesView,
        getSchema: getSchema,
        title: 'Species protected sites map',
      },
    },
  };
  return config;
}
