const xColorSchema = (props) => {
  const data = props.provider_data || {};
  const x = props.data.x || '';
  const choices = data[x]?.map((key) => [key, key]) || [];

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
        type: 'array',
        choices,
      },
      color: {
        title: 'Color',
        type: 'string',
      },
    },

    required: ['label', 'color'],
  };
};

const getSchema = (props) => {
  const data = props.provider_data || {};
  const choices = Object.keys(data).map((key) => [key, key]);

  return {
    title: 'Exploded pies chart',

    fieldsets: [
      {
        id: 'default',
        title: 'Default',
        fields: ['x', 'y', 'x_colors', 'precision'],
      },
    ],

    properties: {
      x: {
        title: 'Value',
        type: 'array',
        choices,
      },
      y: {
        title: 'Label',
        type: 'array',
        choices,
      },
      x_colors: {
        title: 'Labels color',
        widget: 'objectlist',
        schema: xColorSchema(props),
      },
      precision: {
        title: 'Precision',
        type: 'number',
        minimum: -1,
      },
    },

    required: [],
  };
};

export default getSchema;
