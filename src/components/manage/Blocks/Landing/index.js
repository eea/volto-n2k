import worldSVG from '@plone/volto/icons/world.svg';
import Edit from './Edit';
import View from './View';
import coasts_and_seas from './images/coasts_and_seas.png';
import forests from './images/forests.png';
import mountains from './images/mountains.png';
import grasslands from './images/grasslands.png';
import rivers from './images/rivers.png';
import islands from './images/islands.png';
import people_and_nature from './images/people_and_nature.png';
import natura2000 from './images/natura2000.png';

export const tiles = [
  {
    image: coasts_and_seas,
    title: 'Coasts and seas',
    description: 'COASTS AND SEAS',
    link: '/natura2000/coasts-and-seas',
  },
  {
    image: forests,
    title: 'Forests',
    description: 'FORESTS',
    link: '/natura2000/forests',
  },
  {
    image: mountains,
    title: 'Mountains',
    description: 'MOUNTAINS',
    link: '/natura2000/mountains',
  },
  {
    image: grasslands,
    title: 'Grasslands',
    description: 'GRASSLANDS',
    link: '/natura2000/grasslands',
  },
  {
    image: rivers,
    title: 'Rivers and lakes',
    description: 'RIVERS AND LAKES',
    link: '/natura2000/rivers-and-lakes',
  },
  {
    image: islands,
    title: 'Islands',
    description: 'ISLANDS',
    link: '/natura2000/islands',
  },
  {
    image: people_and_nature,
    title: 'People and nature',
    description: 'PEOPLE AND NATURE',
    link: '/natura2000/people-and-nature',
  },
  {
    image: natura2000,
    title: 'Natura 2000',
    description: 'NATURA 2000',
    link: '/natura2000/natura2000',
  },
];

export const tileProps = {
  mobile: 12,
  tablet: 12,
  computer: 6,
  largeScreen: 6,
  widescreen: 6,
};

export const getStyle = (props) => {
  if (!props.screen) return {};
  if (!props.screen.screenWidth || !props.screen.screenHeight) return {};
  if (props.screen.screenWidth < 1071)
    return {
      maxHeight: props.screen.screenHeight.toPixel(),
      minHeight:
        props.screen.screenHeight > 768
          ? props.screen.screenHeight.toPixel()
          : '768px',
    };
  return {
    minHeight:
      props.screen.screenHeight > 768
        ? props.screen.screenHeight.toPixel()
        : '768px',
  };
};

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
