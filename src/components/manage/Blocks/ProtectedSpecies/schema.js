const getSchema = (props) => {
  return {
    title: 'Protected species',

    fieldsets: [
      {
        id: 'default',
        title: 'Default',
        fields: [],
      },
    ],

    properties: {},

    required: [],
  };
};

export default getSchema;
