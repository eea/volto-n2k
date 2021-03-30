export default () => ({
  title: 'Carousel block',
  fieldsets: [
    {
      id: 'default',
      title: 'Default',
      fields: ['theme', 'image'],
    },
  ],
  properties: {
    theme: {
      title: 'Theme',
      type: 'array',
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
  },
  required: [],
});
