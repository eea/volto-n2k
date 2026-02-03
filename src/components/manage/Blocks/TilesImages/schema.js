const imageSchema = {
  title: 'Image',
  fieldsets: [
    {
      id: 'default',
      title: 'Default',
      fields: ['image', 'link', 'title', 'copyright'],
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
    copyright: {
      title: 'Copyright',
    },
  },
  required: ['url', 'title'],
};

export default function getSchema({ formData }) {
  return {
    title: 'Tiles images',
    fieldsets: [
      {
        id: 'default',
        title: 'Default',
        fields: ['theme', 'images'],
      },
      ...(formData?.variation === 'default'
        ? [
            {
              id: 'advanced',
              title: 'Advanced',
              fields: ['size', 'hasBorder', 'rounded'],
            },
          ]
        : []),
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
        widget: 'object_list',
        schema: imageSchema,
      },
    },
    required: [],
  };
}
