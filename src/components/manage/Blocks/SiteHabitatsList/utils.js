// TODO: Manage filters for habitats
/**
 * habitat group
 * habitat category
 */
export const filtersLabels = {
  habitat_group: {
    fo: 'Forests',
    fr: 'Freshwater',
    bmf: 'Bogs, mires and fens',
    gr: 'Grasslands',
    getTitle: () => 'Habitat groups',
  },
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
