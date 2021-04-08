import worldSVG from '@plone/volto/icons/world.svg';
import Edit from './Edit';
import View from './View';
// import coasts_and_seas from './images/coasts_and_seas.png';
import forests from './images/forests.png';
import mountains from './images/mountains.png';
import grasslands from './images/grasslands.png';
import rivers from './images/rivers.png';
import islands from './images/islands.png';
import pople_and_nature from './images/pople_and_nature.png';

export const tiles = [
  {
    image: forests,
    title: 'Coasts and seas',
    description: 'COASTS AND SEAS',
  },
  {
    image: forests,
    title: 'Forests',
    description: 'FORESTS',
  },
  {
    image: mountains,
    title: 'Mountains',
    description: 'MOUNTAINS',
  },
  {
    image: grasslands,
    title: 'Grasslands',
    description: 'GRASSLANDS',
  },
  {
    image: rivers,
    title: 'Rivers and lakes',
    description: 'RIVERS AND LAKES',
  },
  {
    image: islands,
    title: 'Islands',
    description: 'ISLANDS',
  },
  {
    image: pople_and_nature,
    title: 'People and nature',
    description: 'PEOPLE AND NATURE',
  },
  {
    image: forests,
    title: 'Natura 2000',
    description: 'NATURA 2000',
  },
];

export const tileProps = { mobile: 12, tablet: 5, computer: 5 };

export default (config) => {
  config.blocks.blocksConfig.landing_block = {
    id: 'landing_block',
    title: 'Landing block',
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
    blockHasOwnFocusManagement: true,
  };
  return config;
};
