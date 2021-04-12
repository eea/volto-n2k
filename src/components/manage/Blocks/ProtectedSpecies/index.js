import ProtectedSpeciesView from './View';
import getSchema from './schema';

export default (config) => {
  config.blocks.blocksConfig.custom_connected_block = {
    ...config.blocks.blocksConfig.custom_connected_block,
    blocks: {
      ...config.blocks.blocksConfig.custom_connected_block.blocks,
      protected_species: {
        view: ProtectedSpeciesView,
        getSchema: getSchema,
      },
    },
  };
  return config;
};
