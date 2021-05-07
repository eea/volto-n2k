const getSchema = (props) => {
  return {
    title: 'Site protected species',

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
