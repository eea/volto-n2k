import DefaultHorizontalView from './DefaultHorizontalView';
import HorizontalCarouselView from './HorizontalView';
import carouselSchema from './schema';

export { HorizontalCarouselView, carouselSchema };

export default (config) => {
  const carouselVariation = config.blocks.blocksConfig.tabs_block.variations.find(
    (variation) => variation.id === 'carousel-horizontal',
  );

  config.blocks.blocksConfig.tabs_block.variations = [
    ...config.blocks.blocksConfig.tabs_block.variations.filter(
      (variation) => variation.id !== 'carousel-horizontal',
    ),
    { ...carouselVariation, view: DefaultHorizontalView, yes: true },
    {
      id: 'carousel_n2k',
      title: 'Carousel Natura 2000',
      view: HorizontalCarouselView,
      schemaEnhancer: carouselSchema,
    },
  ];

  return config;
};
