import ExplodedPiesChart from './View';
import getSchema from './schema';

export default (config) => {
  config.blocks.blocksConfig.custom_connected_block = {
    ...config.blocks.blocksConfig.custom_connected_block,
    blocks: {
      ...config.blocks.blocksConfig.custom_connected_block.blocks,
      exploded_pies_chart: {
        view: ExplodedPiesChart,
        getSchema: getSchema,
        title: 'Exploded pies chart',
      },
    },
  };
  return config;
};
