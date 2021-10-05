const getSchema = (props) => {
  return {
    title: 'Stacked bars chart',

    fieldsets: [
      {
        id: 'default',
        title: 'Default',
        fields: ['hoverText'],
      },
    ],

    properties: {
      hoverText: {
        title: 'Hover text',
        description: "Add '{}' for bar quantity value, ex: '{} Forests'",
        widget: 'textarea',
      },
    },

    required: [],
  };
};

export default getSchema;
