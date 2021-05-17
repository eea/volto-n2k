export default () => ({
  title: 'Image text',
  fieldsets: [
    {
      id: 'default',
      title: 'Default',
      fields: ['theme', 'hasBorder'],
    },
    {
      id: 'image',
      title: 'Image',
      fields: ['image', 'imageSize', 'imageTitle'],
    },
  ],
  properties: {
    theme: {
      title: 'Theme',
      type: 'array',
      choices: [
        ['light', 'Light'],
        ['grey', 'Grey'],
        ['dark', 'Dark'],
      ],
      default: 'light',
    },
    hasBorder: {
      title: 'Border',
      type: 'boolean',
      default: true,
    },
    image: {
      title: 'Image',
      widget: 'object_by_path',
    },
    imageSize: {
      title: 'Size',
      type: 'number',
    },
    imageTitle: {
      title: 'Title',
    },
  },
  required: [],
});
