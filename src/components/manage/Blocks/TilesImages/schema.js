const imageSchema = {
  title: 'Image',
  fieldsets: [
    {
      id: 'default',
      title: 'Default',
      fields: ['image', 'link', 'title'],
    },
    {
      id: 'copyright',
      title: 'Copyright',
      fields: ['copyright', 'copyrightIcon', 'copyrightPosition'],
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
      title: 'Text',
    },
    copyrightIcon: {
      title: 'Icon',
      description: (
        <>
          Ex. ri-copyright-line. See{' '}
          <a
            target="_blank"
            rel="noopener"
            href="https://eea.github.io/volto-eea-design-system/docs/webdev/Guidelines/iconography/#icon-set"
          >
            Remix Icon set
          </a>
        </>
      ),
      default: 'ri-copyright-line',
    },
    copyrightPosition: {
      title: 'Align',
      widget: 'align',
      actions: ['left', 'right'],
      defaultValue: 'left',
    },
  },
  required: ['url', 'title'],
};

export default function getSchema() {
  return {
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
        widget: 'object_list',
        schema: imageSchema,
      },
    },
    required: [],
  };
}
