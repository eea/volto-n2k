// TODO: Manage filters for habitats
/**
 * habitat group
 * habitat category
 */
export const habitatFiltersLabels = {
  habitat_group: {
    fo: 'Forests',
    fr: 'Freshwater',
    bmf: 'Bogs, mires and fens',
    gr: 'Grasslands',
    getTitle: () => 'Habitat groups',
  },
};

export const filtersLabels = {
  population_type: {
    p: 'Permanent',
    r: 'Reproducing',
    c: 'Concentration',
    w: 'Wintering',
    getTitle: () => 'Population type',
  },
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
