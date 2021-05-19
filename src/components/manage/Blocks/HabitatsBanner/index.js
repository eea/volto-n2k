import HabitatsBannerView from './View';
import getSchema from './schema';

export default (config) => {
  config.blocks.blocksConfig.custom_connected_block = {
    ...config.blocks.blocksConfig.custom_connected_block,
    blocks: {
      ...config.blocks.blocksConfig.custom_connected_block.blocks,
      habitats_banner: {
        view: HabitatsBannerView,
        getSchema: getSchema,
        title: 'Habitat banner',
      },
    },
  };
  return config;
};
