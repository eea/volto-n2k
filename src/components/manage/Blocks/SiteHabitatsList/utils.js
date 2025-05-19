export const filtersLabels = {
  habitat_group: {
    fo: 'Forests',
    fr: 'Freshwater',
    bmf: 'Bogs, mires and fens',
    gr: 'Grasslands',
    getTitle: () => 'Habitat groups',
  },
  habitat_prioriy: {
    wp: 'With priority',
    np: 'Without priority',
    getTitle: () => 'Habitat priority'
  }
}; 

export const getPopulationString = (min, max, prefix = '') => {
  return `${prefix}Population: min: ${min || 'not reported'}, max: ${
    max || 'not reported'
  }`;
};

export const getLabelString = (label, key, prefix = '') => {
  return `${prefix}${filtersLabels[label].getTitle()}: ${
    filtersLabels[label]?.[key]?.toLowerCase() || key || 'not reported'
  }`;
};
