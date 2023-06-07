import config from '@plone/volto/registry';

const colorSchema = (props) => {
  return {
    title: 'Color',

    fieldsets: [
      {
        id: 'default',
        title: 'Default',
        fields: ['label', 'color'],
      },
    ],

    properties: {
      label: {
        title: 'Label',
        type: 'string',
      },
      color: {
        title: 'Color',
        widget: 'simple_color',
        available_colors:
          config.blocks.blocksConfig.simpleDataConnectedTable.available_colors,
      },
    },

    required: [],
  };
};

const coloredTableSchema = (props) => {
  return {
    title: 'Colored datatable v2',

    fieldsets: [
      {
        id: 'default',
        title: 'Default',
        fields: ['td_color'],
      },
    ],

    properties: {
      td_color: {
        title: 'Table rows color',
        widget: 'object_list',
        schema: colorSchema(props),
      },
    },

    required: [],
  };
};

export default coloredTableSchema;
