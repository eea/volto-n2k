import ContactBlockView from './View';
import getSchema from './schema';

export default function applyConfig(config) {
  config.blocks.blocksConfig.custom_connected_block = {
    ...config.blocks.blocksConfig.custom_connected_block,
    blocks: {
      ...config.blocks.blocksConfig.custom_connected_block.blocks,
      contact_block: {
        view: ContactBlockView,
        getSchema: getSchema,
        title: 'Contact block',
      },
    },
  };
  return config;
}
