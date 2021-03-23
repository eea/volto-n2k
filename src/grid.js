import codeSVG from '@plone/volto/icons/code.svg';

export const gridSizes = {};

export const variants = [
  {
    icon: codeSVG,
    defaultData: {
      gridSize: 12,
      gridCols: ['twoFifths', 'threeFifths'],
    },
    title: '40 / 60',
  },
  {
    icon: codeSVG,
    defaultData: {
      gridSize: 12,
      gridCols: ['twoFifths'],
    },
    title: '40',
  },
  {
    icon: codeSVG,
    defaultData: {
      gridSize: 12,
      gridCols: ['halfWidth'],
    },
    title: '50',
  },
  {
    icon: codeSVG,
    defaultData: {
      gridSize: 12,
      gridCols: ['full', 'halfWidth', 'halfWidth'],
    },
    title: '100 / 50 / 50',
  },
  {
    icon: codeSVG,
    defaultData: {
      gridSize: 12,
      gridCols: ['full', 'halfWidth', 'halfWidth', 'full'],
    },
    title: '100 / 50 / 50 / 100',
  },
];
