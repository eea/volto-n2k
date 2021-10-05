export default () => ({
  title: 'Carousel block',
  fieldsets: [
    {
      id: 'default',
      title: 'Default',
      fields: ['theme', 'image', 'learnMore'],
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
    learnMore: {
      title: 'Learn more',
      widget: 'textarea',
      description: 'Learn more placeholder apearing only on first slide',
    },
  },
  required: [],
});
