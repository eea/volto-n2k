import StatusListView from './View';
import getSchema from './schema';

export default (config) => {
  config.blocks.blocksConfig.custom_connected_block = {
    ...config.blocks.blocksConfig.custom_connected_block,
    blocks: {
      ...config.blocks.blocksConfig.custom_connected_block.blocks,
      status_list: {
        view: StatusListView,
        getSchema: getSchema,
        title: 'Status list',
      },
    },
  };
  return config;
};
