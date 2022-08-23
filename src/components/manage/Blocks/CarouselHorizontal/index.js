import DefaultHorizontalView from './DefaultHorizontalView';
import HorizontalCarouselView from './HorizontalView';
import carouselSchema from './schema';

export { HorizontalCarouselView, carouselSchema };

export default (config) => {
  config.blocks.blocksConfig.tabs_block = {
    ...(config.blocks.blocksConfig.tabs_block || {}),
    templates: {
      ...(config.blocks.blocksConfig.tabs_block?.templates || {}),
      carousel: {
        ...(config.blocks.blocksConfig.tabs_block?.templates?.carousel || {}),
        view: DefaultHorizontalView,
      },
      carousel_n2k: {
        title: 'Carousel Natura 2000',
        view: HorizontalCarouselView,
        schema: carouselSchema,
      },
    },
  };
  return config;
};
