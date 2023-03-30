import TestView from './View';
import getSchema from './schema';

export default (config) => {
  config.blocks.blocksConfig.custom_connected_block = {
    ...config.blocks.blocksConfig.custom_connected_block,
    blocks: {
      ...config.blocks.blocksConfig.custom_connected_block.blocks,
      test_component: {
        view: TestView,
        getSchema: getSchema,
        title: 'Test Comp',
      },
    },
  };
  return config;
};
