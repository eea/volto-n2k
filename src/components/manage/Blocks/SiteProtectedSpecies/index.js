import SiteProtectedSpeciesView from './View';
import getSchema from './schema';

export default (config) => {
  config.blocks.blocksConfig.custom_connected_block = {
    ...config.blocks.blocksConfig.custom_connected_block,
    blocks: {
      ...config.blocks.blocksConfig.custom_connected_block.blocks,
      site_protected_species: {
        view: SiteProtectedSpeciesView,
        getSchema: getSchema,
        title: 'Site protected species',
      },
    },
  };
  return config;
};
