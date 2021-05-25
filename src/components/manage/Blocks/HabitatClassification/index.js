import HabitatClassification from './View';
import getSchema from './schema';

export default (config) => {
  config.blocks.blocksConfig.custom_connected_block = {
    ...config.blocks.blocksConfig.custom_connected_block,
    blocks: {
      ...config.blocks.blocksConfig.custom_connected_block.blocks,
      habitat_classification: {
        view: HabitatClassification,
        getSchema: getSchema,
        title: 'Habitat classification',
      },
    },
  };
  return config;
};
