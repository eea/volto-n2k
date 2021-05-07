import SiteProtectedHabitatsView from './View';
import getSchema from './schema';

export default (config) => {
  config.blocks.blocksConfig.custom_connected_block = {
    ...config.blocks.blocksConfig.custom_connected_block,
    blocks: {
      ...config.blocks.blocksConfig.custom_connected_block.blocks,
      site_protected_habitats: {
        view: SiteProtectedHabitatsView,
        getSchema: getSchema,
        title: 'Site protected habitats',
      },
    },
  };
  return config;
};
