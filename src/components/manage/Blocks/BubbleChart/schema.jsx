import React from 'react';

const getSchema = (props) => {
  const data = props.provider_data || {};
  const choices = Object.keys(data).map((key) => [key, key]);

  return {
    title: 'Bubble chart',

    fieldsets: [
      {
        id: 'default',
        title: 'Default',
        fields: ['x', 'y', 'interpolation'],
      },
      {
        id: 'size_column',
        title: 'Size column',
        fields: ['xSpecifier', 'xTextTemplate'],
      },
      {
        id: 'label_column',
        title: 'Label column',
        fields: ['ySpecifier', 'yTextTemplate'],
      },
    ],

    properties: {
      x: {
        title: 'Size column',
        choices,
      },
      y: {
        title: 'Label column',
        choices,
      },
      interpolation: {
        title: 'Color schema',
        choices: [
          'interpolateBlues',
          'interpolateBrBG',
          'interpolateBuGn',
          'interpolateBuPu',
          'interpolateCividis',
          'interpolateCool',
          'interpolateCubehelixDefault',
          'interpolateGnBu',
          'interpolateGreens',
          'interpolateGreys',
          'interpolateInferno',
          'interpolateMagma',
          'interpolateOrRd',
          'interpolateOranges',
          'interpolatePRGn',
          'interpolatePiYG',
          'interpolatePlasma',
          'interpolatePuBu',
          'interpolatePuBuGn',
          'interpolatePuOr',
          'interpolatePuRd',
          'interpolatePurples',
          'interpolateRainbow',
          'interpolateRdBu',
          'interpolateRdGy',
          'interpolateRdPu',
          'interpolateRdYlBu',
          'interpolateRdYlGn',
          'interpolateReds',
          'interpolateSinebow',
          'interpolateSpectral',
          'interpolateTurbo',
          'interpolateViridis',
          'interpolateWarm',
          'interpolateYlGn',
          'interpolateYlGnBu',
          'interpolateYlOrBr',
          'interpolateYlOrRd',
        ].map((item) => [item, item]),
      },
      xSpecifier: {
        title: 'Format specifier',
        description: (
          <>
            See{' '}
            <a
              target="_blank"
              rel="noopener noreferrer"
              href="https://github.com/d3/d3-format"
            >
              D3 format documentation
            </a>
          </>
        ),
      },
      xTextTemplate: {
        title: 'Text template',
        description: 'Add suffix/prefix to text. Use {} for value placeholder',
      },
      ySpecifier: {
        title: 'Format specifier',
        description: (
          <>
            See{' '}
            <a
              target="_blank"
              rel="noopener noreferrer"
              href="https://github.com/d3/d3-format"
            >
              D3 format documentation
            </a>
          </>
        ),
      },
      yTextTemplate: {
        title: 'Text template',
        description: 'Add suffix/prefix to text. Use {} for value placeholder',
      },
    },

    required: [],
  };
};

export default getSchema;
