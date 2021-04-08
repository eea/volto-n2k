const tileSchema = () => ({
  title: 'Tile',
  fieldsets: [
    {
      id: 'default',
      title: 'Default',
      fields: ['title', 'description', 'link', 'image', 'copyright'],
    },
  ],

  properties: {
    title: {
      title: 'Title',
      type: 'text',
    },
    description: {
      title: 'Description',
      type: 'text',
    },
    link: {
      title: 'Link',
      widget: 'object_by_path',
    },
    image: {
      title: 'Image',
      widget: 'object_by_path',
    },
    copyright: {
      title: 'Copyright',
      type: 'text',
    },
  },

  required: ['attachedimage'],
});

const getSchema = () => ({
  title: 'Landing block',
  fieldsets: [
    {
      id: 'default',
      title: 'Default',
      fields: ['useDefault', 'tiles'],
    },
  ],
  properties: {
    useDefault: {
      title: 'Use default tiles',
      type: 'boolean',
      default: true,
    },
    tiles: {
      title: 'Tiles',
      widget: 'object_list_inline',
      description: 'Add a list of tiles',
      schema: tileSchema(),
    },
  },
  required: [],
});

export default getSchema;
