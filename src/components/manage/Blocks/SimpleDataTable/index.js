import { ColoredTableView, coloredTableSchema } from './templates/colored';

export default function applyConfig(config) {
  config.blocks.blocksConfig.simpleDataConnectedTable = {
    ...config.blocks.blocksConfig.simpleDataConnectedTable,
    templates: {
      ...config.blocks.blocksConfig.simpleDataConnectedTable.templates,
      colored_table_v2: {
        title: 'Colored table v2',
        view: ColoredTableView,
        schema: coloredTableSchema,
      },
    },
  };
  return config;
}
