import SpeciesClassification from './View';
import getSchema from './schema';

export default function applyConfig(config) {
  config.blocks.blocksConfig.custom_connected_block = {
    ...config.blocks.blocksConfig.custom_connected_block,
    blocks: {
      ...config.blocks.blocksConfig.custom_connected_block.blocks,
      species_classification: {
        view: SpeciesClassification,
        getSchema: getSchema,
        title: 'Species classification',
      },
    },
  };
  return config;
}
