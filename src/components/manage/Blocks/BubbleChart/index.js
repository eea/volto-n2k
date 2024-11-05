import BubbleChart from './View';
import getSchema from './schema';

export default function applyConfig(config) {
  config.blocks.blocksConfig.custom_connected_block = {
    ...config.blocks.blocksConfig.custom_connected_block,
    blocks: {
      ...config.blocks.blocksConfig.custom_connected_block.blocks,
      bubble_chart: {
        view: BubbleChart,
        getSchema: getSchema,
        title: 'Bubble chart',
      },
    },
  };
  return config;
}
