import worldSVG from '@plone/volto/icons/world.svg';
import Edit from './Edit';
import View from './View';
import coasts_and_seas from './images/coasts_and_seas.webp';
import forests from './images/forests.webp';
import mountains from './images/mountains.webp';
import grasslands from './images/grasslands.webp';
import rivers from './images/rivers.webp';
import toolkit from './images/toolkit_icon.webp';
import peatlands from './images/peatlands.webp';
import natura2000 from './images/natura2000.webp';

export const tiles = [
  {
    image: natura2000,
    title: 'Natura 2000',
    description: 'NATURA 2000',
    link: '/natura2000/natura2000',
  },
  {
    image: coasts_and_seas,
    title: 'Coasts and seas',
    description: 'COASTS AND SEAS',
    link: '/natura2000/:lang/coasts-and-seas',
  },
  {
    image: peatlands,
    title: 'Peatlands',
    description: 'PEATLANDS',
    link: '/natura2000/:lang/peatlands',
  },
  {
    image: forests,
    title: 'Forests',
    description: 'FORESTS',
    link: '/natura2000/:lang/forests',
  },
  {
    image: mountains,
    title: 'Mountains',
    description: 'MOUNTAINS',
    link: '/natura2000/:lang/mountains',
  },
  {
    image: grasslands,
    title: 'Grasslands',
    description: 'GRASSLANDS',
    link: '/natura2000/:lang/grasslands',
  },
  {
    image: rivers,
    title: 'Rivers and lakes',
    description: 'RIVERS AND LAKES',
    link: '/natura2000/:lang/rivers-and-lakes',
  },
  {
    image: toolkit,
    title: 'Toolkit',
    description: 'TOOLKIT',
    link: 'https://europa.eu/youth/year-of-youth/eu_initiative/pdf/32289_en',
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
  if (!props.screen.width || !props.screen.height) return {};
  return {
    minHeight: (
      props.screen.height - props.screen.browserToolbarHeight
    ).toPixel(),
    maxHeight: (
      props.screen.height - props.screen.browserToolbarHeight
    ).toPixel(),
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
