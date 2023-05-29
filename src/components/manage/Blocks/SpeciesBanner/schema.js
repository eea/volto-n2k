const getSchema = () => {
  return {
    title: 'Species banner',

    fieldsets: [
      {
        id: 'default',
        title: 'Default',
        fields: [
          'species_provider',
          'species_pictures_provider',
          'allowedParams',
        ],
      },
    ],

    properties: {
      species_provider: {
        title: 'Species provider',
        widget: 'url',
      },
      species_pictures_provider: {
        title: 'Species pictures provider',
        widget: 'url',
      },
      allowedParams: {
        title: 'Allowed params',
        type: 'array',
        creatable: true,
        items: {
          choices: [],
        },
      },
    },

    required: [],
  };
};

export default getSchema;
