const linksSchema = () => ({
  title: 'Link',
  fieldsets: [
    {
      id: 'default',
      title: 'Default',
      fields: ['title', 'href', 'hash', 'target', 'isHash'],
    },
  ],
  properties: {
    title: {
      title: 'Title',
    },
    href: {
      title: 'URL',
      widget: 'textarea',
    },
    hash: {
      title: 'Hash',
      widget: 'blocks_browser',
      multiple: false,
      selectedItemAttrs: [],
    },
    target: {
      title: 'Target',
      choices: [
        ['_blank', 'External'],
        ['_self', 'internal'],
      ],
      defaultValue: '_self',
    },
    isHash: {
      title: 'Hash link',
      type: 'boolean',
      default: true,
    },
  },
  required: [],
});

export default () => ({
  title: 'Navigation anchors',
  fieldsets: [
    {
      id: 'default',
      title: 'Default',
      fields: ['links'],
    },
  ],
  properties: {
    links: {
      title: 'Links',
      schema: linksSchema(),
      widget: 'object_list',
    },
  },
  required: [],
});
