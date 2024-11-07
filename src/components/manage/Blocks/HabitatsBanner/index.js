import worldSVG from '@plone/volto/icons/world.svg';
import Edit from './Edit';
import View from './View';

export default function applyConfig(config) {
  config.blocks.blocksConfig.habitats_banner = {
    id: 'habitats_banner',
    title: 'Habitats banner',
    icon: worldSVG,
    group: 'natura_2000',
    edit: Edit,
    view: View,
    restricted: false,
    mostUsed: false,
    sidebarTab: 1,
    blocks: {},
    security: {
      addPermission: [],
      view: [],
    },
    blockHasOwnFocusManagement: false,
  };
  return config;
}
