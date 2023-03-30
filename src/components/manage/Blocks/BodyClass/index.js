import worldSVG from '@plone/volto/icons/world.svg';
import BodyClassEdit from './Edit';
import BodyClassView from './View';

export default (config) => {
  config.blocks.blocksConfig.body_classname = {
    id: 'body_classname',
    title: 'Body classname',
    icon: worldSVG,
    group: 'natura_2000',
    edit: BodyClassEdit,
    view: BodyClassView,
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
