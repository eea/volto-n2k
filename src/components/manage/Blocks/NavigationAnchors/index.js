import NavigationAnchorsEdit from './Edit';
import NavigationAnchorsView from './View';
import worldSVG from '@plone/volto/icons/world.svg';

export default (config) => {
  config.blocks.blocksConfig.navigation_anchors = {
    id: 'navigation_anchors',
    title: 'Navigation anchors',
    icon: worldSVG,
    group: 'natura_2000',
    edit: NavigationAnchorsEdit,
    view: NavigationAnchorsView,
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
};
