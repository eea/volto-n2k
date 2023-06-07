const getSchema = (props) => {
  const data = props.provider_data || {};
  const choices = Object.keys(data).map((key) => [key, key]);

  return {
    title: 'Status list',

    fieldsets: [
      {
        id: 'default',
        title: 'Default',
        fields: ['value', 'status'],
      },
    ],

    properties: {
      value: {
        title: 'Value',
        choices,
      },
      status: {
        title: 'Status',
        choices,
      },
    },

    required: [],
  };
};

export default getSchema;
