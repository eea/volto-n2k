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
          'count',
          'theme',
          'value',
          ...(props.data.labeled ?? true ? ['label'] : []),
        ],
      },
    ],

    properties: {
      labeled: {
        title: 'Has label',
        type: 'boolean',
        default: true,
      },
      theme: {
        title: 'Theme',
        choices: [
          ['default', 'Default'],
          ['theme_1', 'Theme 1'],
          ['theme_2', 'Theme 2'],
        ],
      },
      value: {
        title: 'Value',
        choices,
      },
      label: {
        title: 'Label',
        choices,
      },
      count: {
        title: 'Max items',
        type: 'number',
        minimum: 0,
        maximum: Infinity,
      },
    },

    required: [],
  };
};

export default getSchema;
