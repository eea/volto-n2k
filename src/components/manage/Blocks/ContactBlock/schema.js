const getContactFields = (props) => {
  const data = props.provider_data || {};
  const choices = Object.keys(data).map((key) => [key, key]) || [];

  return {
    title: 'Contact field',
    fieldsets: [
      {
        id: 'default',
        title: 'Default',
        fields: ['icon', 'dataEntity'],
      },
    ],
    properties: {
      icon: {
        title: 'Icon',
        type: 'array',
        choices: [
          ['domain', 'Domain'],
          ['location', 'Location'],
          ['email', 'Email'],
        ],
      },
      dataEntity: {
        title: 'Data entity',
        type: 'array',
        choices,
      },
    },
    required: ['icon', 'dataEntity'],
  };
};
const getSchema = (props) => {
  return {
    title: 'Contact block',

    fieldsets: [
      {
        id: 'default',
        title: 'Default',
        fields: ['contactFields', 'placeholder'],
      },
    ],

    properties: {
      contactFields: {
        title: 'Contact fields',
        widget: 'objectlist',
        schema: getContactFields(props),
      },
      placeholder: {
        title: 'Placeholder',
        widget: 'textarea',
        defaultValue: 'No contact information',
      },
    },

    required: [],
  };
};

export default getSchema;
