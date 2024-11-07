export default function getSchema() {
  return {
    title: 'Image text',
    fieldsets: [
      {
        id: 'default',
        title: 'Default',
        fields: ['theme', 'hasBorder', 'rounded'],
      },
      {
        id: 'image',
        title: 'Image',
        fields: ['image', 'imageSize', 'imageTitle'],
      },
      {
        id: 'link',
        title: 'Link',
        fields: ['linkTitle', 'href', 'target'],
      },
    ],
    properties: {
      theme: {
        title: 'Theme',
        choices: [
          ['light', 'Light'],
          ['grey', 'Grey'],
          ['dark', 'Dark'],
        ],
        default: 'light',
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
      linkTitle: {
        title: 'Title',
      },
      href: {
        title: 'Url',
        widget: 'textarea',
      },
      target: {
        title: 'Target',
        choices: [
          ['_blank', 'New tab'],
          ['_self', 'Same tab'],
        ],
        defaultValue: '_self',
      },
    },
    required: [],
  };
}
