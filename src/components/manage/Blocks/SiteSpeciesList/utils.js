import AmphibiansPNG from './placeholders/Amphibians.png';
import BirdsPNG from './placeholders/Birds.png';
import ConifersPNG from './placeholders/Conifers.png';
import FernsPNG from './placeholders/Ferns.png';
import FishesPNG from './placeholders/Fishes.png';
import FloweringPlantsPNG from './placeholders/Flowering Plants.png';
import FungiPNG from './placeholders/Fungi.png';
import InvertebratesPNG from './placeholders/Invertebrates.png';
import MammalsPNG from './placeholders/Mammals.png';
import MossesLiverwortsPNG from './placeholders/Mosses & Liverworts.png';
import ReptilesPNG from './placeholders/Reptiles.png';

export const photoPlaceholders = {
  Amphibians: AmphibiansPNG,
  Birds: BirdsPNG,
  Conifers: ConifersPNG,
  Ferns: FernsPNG,
  Fishes: FishesPNG,
  'Flowering Plants': FloweringPlantsPNG,
  Fungi: FungiPNG,
  Invertebrates: InvertebratesPNG,
  Mammals: MammalsPNG,
  'Mosses & Liverworts': MossesLiverwortsPNG,
  Reptiles: ReptilesPNG,
};

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
