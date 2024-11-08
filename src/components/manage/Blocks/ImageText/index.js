import ImageTextEdit from './Edit';
import ImageTextView from './View';
import worldSVG from '@plone/volto/icons/world.svg';

export default function applyConfig(config) {
  config.blocks.blocksConfig.image_text = {
    id: 'image_text',
    title: 'Image text',
    icon: worldSVG,
    group: 'natura_2000',
    edit: ImageTextEdit,
    view: ImageTextView,
    restricted: false,
    mostUsed: false,
    sidebarTab: 1,
    blockHasOwnFocusManagement: true,
    blocks: {},
    security: {
      addPermission: [],
      view: [],
    },
  };
  return config;
}
