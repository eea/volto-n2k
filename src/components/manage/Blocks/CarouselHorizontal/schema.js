export default ({ schema }) => {
  const defaultFieldset = schema.fieldsets.find(
    (fieldset) => fieldset.id === 'default',
  );

  schema.fieldsets = [
    ...schema.fieldsets.filter(
      (fieldset) => !['default', 'style'].includes(fieldset.id),
    ),
    {
      ...defaultFieldset,
      fields: [
        ...defaultFieldset.fields.filter(
          (field) => !['image', 'learnMore'].includes(field),
        ),
        'image',
        'learnMore',
      ],
    },
    {
      id: 'style',
      title: 'Style',
      fields: ['theme'],
    },
  ];

  schema.properties = {
    ...schema.properties,
    theme: {
      title: 'Theme',
      choices: [
        ['light', 'Light'],
        ['dark', 'Dark'],
        ['grey', 'Grey'],
      ],
      default: 'light',
    },
    image: {
      title: 'Image',
      widget: 'object_by_path',
    },
    learnMore: {
      title: 'Learn more',
      widget: 'textarea',
      description: 'Learn more placeholder apearing only on first slide',
    },
  };

  return schema;
};
