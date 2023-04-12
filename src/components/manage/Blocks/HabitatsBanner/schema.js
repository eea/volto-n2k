const SourceSchema = {
  title: 'Source',

  fieldsets: [
    {
      id: 'default',
      title: 'Default',
      fields: ['source', 'source_link'],
    },
  ],

  properties: {
    source: {
      type: 'string',
      title: 'Source',
    },
    source_link: {
      type: 'string',
      title: 'Link',
    },
  },

  required: ['source'],
};

const DataProvidersSchema = {
  title: 'Data provider',
  fieldsets: [{ id: 'default', title: 'Default', fields: ['provider_url'] }],
  properties: {
    provider_url: {
      title: 'Provider url',
      widget: 'object_by_path',
    },
  },
};

const getSchema = (props) => {
  return {
    title: 'Habitats Banner',
    fieldsets: [
      {
        id: 'default',
        title: 'Default',
        fields: ['providers', 'allowedParams'],
      },
      {
        id: 'sources',
        title: 'Sources',
        fields: ['sources'],
      },
    ],

    properties: {
      providers: {
        title: 'Data provider',
        schema: DataProvidersSchema,
        widget: 'object_list',
      },
      allowedParams: {
        title: 'Allowed params',
        type: 'array',
        creatable: true,
        items: {
          choices: [],
        },
      },
      sources: {
        title: 'Sources',
        schema: SourceSchema,
        widget: 'object_list',
      },
    },

    required: ['url'],
  };
};

export default getSchema;
