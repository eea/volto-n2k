const getSchema = () => {
  return {
    title: 'Habitats Banner',
    fieldsets: [
      {
        id: 'default',
        title: 'Default',
        fields: [
          'habitat_provider',
          'habitat_pictures_provider',
          'allowedParams',
        ],
      },
    ],

    properties: {
      habitat_provider: {
        title: 'Habitat provider',
        widget: 'url',
      },
      habitat_pictures_provider: {
        title: 'Habitat pictures provider',
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

    required: ['url'],
  };
};

export default getSchema;
