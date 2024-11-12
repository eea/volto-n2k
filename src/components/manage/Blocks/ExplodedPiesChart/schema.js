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
        choices,
      },
      y: {
        title: 'Label',
        choices,
      },
      x_colors: {
        title: 'Labels color',
        widget: 'object_list',
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
