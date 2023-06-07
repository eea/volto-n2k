import config from '@plone/volto/registry';

const getSchema = (props) => {
  const data = props.provider_data || {};
  const choices = Object.keys(data).map((key) => [key, key]);

  const valueSchema = {
    title: 'Value',
    fieldsets: [{ id: 'default', title: 'Default', fields: ['field'] }],
    properties: {
      field: {
        title: 'Field',
        choices,
      },
    },
  };

  return {
    title: 'Labeled list',

    fieldsets: [
      {
        id: 'default',
        title: 'Default',
        fields: ['theme', 'values', 'separator'],
      },
    ],

    properties: {
      values: {
        title: 'Values',
        widget: 'object_list',
        schema: valueSchema,
      },
      separator: {
        title: 'Separator',
      },
      theme: {
        title: 'Theme',
        widget: 'theme_picker',
        colors: [
          ...(config.settings && config.settings.themeColors
            ? config.settings.themeColors.map(({ value, title }) => ({
                name: value,
                label: title,
              }))
            : []),
        ],
      },
    },

    required: [],
  };
};

export default getSchema;
