import SiteShapeView from './View';
import getSchema from './schema';

export default (config) => {
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
};
