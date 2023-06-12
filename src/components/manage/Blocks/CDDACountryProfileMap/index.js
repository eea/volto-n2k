import worldSVG from '@plone/volto/icons/world.svg';
import Edit from './Edit';
import View from './View';

export default (config) => {
  config.blocks.blocksConfig.cdda_country_profile_map = {
    id: 'cdda_country_profile_map',
    title: 'CDDA country profile map',
    icon: worldSVG,
    group: 'custom_blocks',
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
