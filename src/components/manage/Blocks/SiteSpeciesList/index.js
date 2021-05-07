import SiteSpeciesList from './View';
import getSchema from './schema';

export default (config) => {
  config.blocks.blocksConfig.custom_connected_block = {
    ...config.blocks.blocksConfig.custom_connected_block,
    blocks: {
      ...config.blocks.blocksConfig.custom_connected_block.blocks,
      site_species_list: {
        view: SiteSpeciesList,
        getSchema: getSchema,
        title: 'Site species list',
      },
    },
  };
  return config;
};
