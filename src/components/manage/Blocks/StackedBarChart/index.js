import StackedBarChart from './View';
import getSchema from './schema';

export default (config) => {
  config.blocks.blocksConfig.custom_connected_block = {
    ...config.blocks.blocksConfig.custom_connected_block,
    blocks: {
      ...config.blocks.blocksConfig.custom_connected_block.blocks,
      stacked_bar_chart: {
        view: StackedBarChart,
        getSchema: getSchema,
        title: 'Stacked bar chart',
      },
    },
  };
  return config;
};
