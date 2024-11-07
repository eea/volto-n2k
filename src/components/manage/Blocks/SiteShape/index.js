import SiteShapeView from './View';
import getSchema from './schema';

export function getSiteShapeURL(site_code) {
  return encodeURI(
    `https://bio.discomap.eea.europa.eu/arcgis/rest/services/ProtectedSites/Natura2000Sites/MapServer/2/query?f=json&where=SITECODE LIKE '%${site_code.toUpperCase()}%'&returnGeometry=true&spatialRel=esriSpatialRelIntersects&outFields=SITECODE,SITENAME,OBJECTID&outSR=102100`,
  );
}

export default function applyConfig(config) {
  config.blocks.blocksConfig.custom_connected_block = {
    ...config.blocks.blocksConfig.custom_connected_block,
    blocks: {
      ...config.blocks.blocksConfig.custom_connected_block.blocks,
      site_shape: {
        view: SiteShapeView,
        getSchema: getSchema,
        title: 'Site shape',
      },
    },
  };
  return config;
}
