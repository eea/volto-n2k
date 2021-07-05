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
    },

    required: [],
  };
};

export default getSchema;
