const yColorSchema = (props) => {
  const data = props.provider_data || {};
  const y = props.data.y || '';
  const choices = data[y]?.map((key) => [key, key]) || [];

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
        fields: ['x', 'y', 'y_colors'],
      },
    ],

    properties: {
      x: {
        title: 'X',
        type: 'array',
        choices,
      },
      y: {
        title: 'Y',
        type: 'array',
        choices,
      },
      y_colors: {
        title: 'Y colors',
        widget: 'objectlist',
        schema: yColorSchema(props),
      },
    },

    required: [],
  };
};

export default getSchema;
