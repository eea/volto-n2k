import ConnectedLinkList from './View';
import getSchema from './schema';

export default function applyConfig(config) {
  config.blocks.blocksConfig.custom_connected_block = {
    ...config.blocks.blocksConfig.custom_connected_block,
    blocks: {
      ...config.blocks.blocksConfig.custom_connected_block.blocks,
      connected_link_list: {
        view: ConnectedLinkList,
        getSchema: getSchema,
        title: 'Connected link list',
      },
    },
  };
  return config;
}
