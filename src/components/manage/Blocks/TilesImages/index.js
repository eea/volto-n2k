import TilesImagesEdit from './Edit';
import ImageGallery from './variations/ImageGallery/ImageGallery';
import DataConnectedImageGallery from './variations/DataConnectedImageGallery/ImageGallery';
import DefaultView from './variations/Default/Default';
import TilesImagesView from './View';
import worldSVG from '@plone/volto/icons/world.svg';
import schema from '../BodyClass/schema';

export default function applyConfig(config) {
  config.blocks.blocksConfig.tiles_images = {
    id: 'tiles_images',
    title: 'Tiles images',
    icon: worldSVG,
    group: 'natura_2000',
    edit: TilesImagesEdit,
    view: TilesImagesView,
    restricted: false,
    mostUsed: false,
    sidebarTab: 1,
    blocks: {},
    security: {
      addPermission: [],
      view: [],
    },
    variations: [
      {
        id: 'default',
        isDefault: true,
        title: 'Default',
        template: DefaultView,
      },
      {
        id: 'imageGallery',
        isDefault: false,
        title: 'ImageGallery',
        template: ImageGallery,
      },
      {
        id: 'dataConnectedImageGallery',
        isDefault: false,
        title: 'Data Connected ImageGallery',
        template: DataConnectedImageGallery,
        schemaEnhancer: ({ schema, intl, formData }) => {
          schema.fieldsets = schema.fieldsets.map((fieldset) =>
            fieldset.id === 'default'
              ? {
                  ...fieldset,
                  fields: fieldset.fields.filter((field) => field !== 'theme'),
                }
              : fieldset,
          );
          schema.fieldsets.push({
            id: 'data_query',
            title: 'Data query',
            fields: [
              'has_data_query_by_context',
              'has_data_query_by_provider',
              'data_query',
            ],
          });
          schema.properties.images.widget = 'url';
          schema.properties.has_data_query_by_context = {
            title: 'Has data_query by context',
            type: 'boolean',
            description:
              'This flag will denote whether or not the connector will be filtered by data_query applied on the page',
            defaultValue: true,
          };
          schema.properties.has_data_query_by_provider = {
            title: 'Has data_query by provider',
            type: 'boolean',
            description:
              'This flag will denote whether or not the connector will be filtered by data_query applied on the connector itself',
            defaultValue: true,
          };
          schema.properties.data_query = {
            title: 'Data query',
            widget: 'data_query',
          };
          return schema;
        },
      },
    ],
  };

  return config;
}
