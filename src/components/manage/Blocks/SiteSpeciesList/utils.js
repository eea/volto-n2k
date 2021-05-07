import BirdsPNG from './placeholders/Birds.png';

export const photoPlaceholders = {
  Birds: BirdsPNG,
};

export const labels = {
  units: {
    i: 'Individuals',
    p: 'Pairs',
  },
  abundance: {
    C: 'Common',
    R: 'Rare',
    V: 'Very rare',
    P: 'Present',
  },
};

export const getPopulationString = (min, max) => {
  if (!min && !max) return 'Population: unkown';
  if (min) return `Population: min: ${min}`;
  if (max) return `Population: max: ${max}`;
  return `Population: min: ${min}, max: ${max}`;
};

export const getLabelString = (label, key) => {
  return key && labels[label]?.[key]
    ? `, ${label}: ${labels[label]?.[key]?.toLowerCase()}`
    : '';
};
