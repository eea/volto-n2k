import CddaShapeView from './View';
import getSchema from './schema';

export function getCddaShapeURL(site_code) {
  return encodeURI(
    `https://bio.discomap.eea.europa.eu/arcgis/rest/services/ProtectedSites/CDDA_Dyna_WM/MapServer/4/query?f=json&where=cddaId = ${site_code}&returnGeometry=true&spatialRel=esriSpatialRelIntersects&outFields=*&outSR=102100`,
  );
}

export default function applyConfig(config) {
  config.blocks.blocksConfig.custom_connected_block = {
    ...config.blocks.blocksConfig.custom_connected_block,
    blocks: {
      ...config.blocks.blocksConfig.custom_connected_block.blocks,
      cdda_shape: {
        view: CddaShapeView,
        getSchema: getSchema,
        title: 'CDDA shape',
      },
    },
  };
  return config;
}
