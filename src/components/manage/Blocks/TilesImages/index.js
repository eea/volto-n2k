import TilesImagesEdit from './Edit';
import TilesImagesView from './View';
import worldSVG from '@plone/volto/icons/world.svg';

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
  };
  return config;
}
