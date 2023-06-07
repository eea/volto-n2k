const getSchema = (props) => {
  const data = props.provider_data || {};
  const choices = Object.keys(data).map((key) => [key, key]);

  return {
    title: 'Connected link list',

    fieldsets: [
      {
        id: 'default',
        title: 'Default',
        fields: ['value', 'linkValue', 'textTemplate', 'linkTemplate'],
      },
    ],
    properties: {
      value: {
        title: 'Value',
        choices,
      },
      linkValue: {
        title: 'Link value',
        choices,
      },
      textTemplate: {
        title: 'Text template',
        description: 'Add suffix/prefix to text. Use {} for value placeholder',
      },
      linkTemplate: {
        title: 'Link template',
        description: 'Add suffix/prefix to link. Use {} for value placeholder',
      },
    },
    required: [],
  };
};

export default getSchema;
