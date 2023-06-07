const imageSchema = {
  title: 'Image',
  fieldsets: [
    {
      id: 'default',
      title: 'Default',
      fields: ['image', 'link', 'title'],
    },
  ],
  properties: {
    image: {
      title: 'image',
      widget: 'object_by_path',
    },
    link: {
      title: 'link',
      widget: 'object_by_path',
    },
    title: {
      title: 'Title',
    },
  },
  required: ['url', 'title'],
};

export default () => ({
  title: 'Tiles images',
  fieldsets: [
    {
      id: 'default',
      title: 'Default',
      fields: ['theme', 'images'],
    },
    {
      id: 'advanced',
      title: 'Advanced',
      fields: ['size', 'hasBorder', 'rounded'],
    },
  ],
  properties: {
    size: {
      title: 'Tiles size',
      type: 'number',
    },
    hasBorder: {
      title: 'With border',
      type: 'boolean',
      default: true,
    },
    rounded: {
      title: 'Rounded',
      type: 'boolean',
      default: true,
    },
    theme: {
      title: 'Theme',
      choices: [
        ['light', 'Light'],
        ['grey', 'Grey'],
        ['dark', 'Dark'],
      ],
      default: 'light',
    },
    images: {
      title: 'Images',
      widget: 'object_list_inline',
      schema: imageSchema,
    },
  },
  required: [],
});
