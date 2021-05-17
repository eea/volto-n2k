import SpeciesBannerView from './View';
import getSchema from './schema';

export default (config) => {
  config.blocks.blocksConfig.custom_connected_block = {
    ...config.blocks.blocksConfig.custom_connected_block,
    blocks: {
      ...config.blocks.blocksConfig.custom_connected_block.blocks,
      species_banner: {
        view: SpeciesBannerView,
        getSchema: getSchema,
        title: 'Species banner',
      },
    },
  };
  return config;
};
