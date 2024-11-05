import SiteHabitatsList from './View';
import getSchema from './schema';

export default function applyConfig(config) {
  config.blocks.blocksConfig.custom_connected_block = {
    ...config.blocks.blocksConfig.custom_connected_block,
    blocks: {
      ...config.blocks.blocksConfig.custom_connected_block.blocks,
      site_habitats_list: {
        view: SiteHabitatsList,
        getSchema: getSchema,
        title: 'Site habitats list',
      },
    },
  };
  return config;
}
