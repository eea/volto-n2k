import LabeledListView from './View';
import getSchema from './schema';

export default function applyConfig(config) {
  config.blocks.blocksConfig.custom_connected_block = {
    ...config.blocks.blocksConfig.custom_connected_block,
    blocks: {
      ...config.blocks.blocksConfig.custom_connected_block.blocks,
      labeled_list: {
        view: LabeledListView,
        getSchema: getSchema,
        title: 'Labeled list',
      },
    },
  };
  return config;
}
