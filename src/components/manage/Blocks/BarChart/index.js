import BarChart from './View';
import getSchema from './schema';

export default (config) => {
  config.blocks.blocksConfig.custom_connected_block = {
    ...config.blocks.blocksConfig.custom_connected_block,
    blocks: {
      ...config.blocks.blocksConfig.custom_connected_block.blocks,
      bar_chart: {
        view: BarChart,
        getSchema: getSchema,
        title: 'Bar chart',
      },
    },
  };
  return config;
};
