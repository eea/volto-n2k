import SiteBannerView from './View';
import getSchema from './schema';

export default function applyConfig(config) {
  config.blocks.blocksConfig.custom_connected_block = {
    ...config.blocks.blocksConfig.custom_connected_block,
    blocks: {
      ...config.blocks.blocksConfig.custom_connected_block.blocks,
      site_banner: {
        view: SiteBannerView,
        getSchema: getSchema,
        title: 'Site banner',
      },
    },
  };
  return config;
}
