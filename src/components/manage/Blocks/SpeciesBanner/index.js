import worldSVG from '@plone/volto/icons/world.svg';
import Edit from './Edit';
import View from './View';

export default (config) => {
  config.blocks.blocksConfig.species_banner = {
    id: 'species_banner',
    title: 'Species banner',
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
};
