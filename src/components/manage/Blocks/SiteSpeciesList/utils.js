export const filtersLabels = {
  // type: {
  //   p: 'Permanent',
  //   r: 'Reproducing',
  //   c: 'Concentration',
  //   w: 'Wintering',
  // },
  counting_unit: {
    i: 'Individuals',
    p: 'Pairs',
    getTitle: () => 'Unit',
  },
  abundance_category: {
    C: 'Common',
    R: 'Rare',
    V: 'Very rare',
    P: 'Present',
    getTitle: () => 'Abundance',
  },
};

export const getPopulationString = (min, max) => {
  return `Population: min: ${min || 'not reported'}, max: ${
    max || 'not reported'
  }`;
};

export const getLabelString = (label, key) => {
  return `, ${filtersLabels[label].getTitle()}: ${
    filtersLabels[label]?.[key]?.toLowerCase() || 'not reported'
  }`;
};
