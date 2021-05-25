const getSchema = (props) => {
  const data = props.provider_data || {};
  const choices = Object.keys(data).map((key) => [key, key]);

  return {
    title: 'List',

    fieldsets: [
      {
        id: 'default',
        title: 'Default',
        fields: [
          'labeled',
          'value',
          ...(props.data.labeled ?? true ? ['label'] : []),
          'grid_size',
        ],
      },
    ],

    properties: {
      labeled: {
        title: 'Has label',
        type: 'boolean',
        default: true,
      },
      value: {
        title: 'Value',
        type: 'array',
        choices,
      },
      label: {
        title: 'Label',
        type: 'array',
        choices,
      },
      grid_size: {
        title: 'Grid size',
        widget: 'number',
        min: 0,
        max: 12,
      },
    },

    required: [],
  };
};

export default getSchema;
