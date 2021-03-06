import AmphibiansPNG from '@eeacms/volto-n2k/icons/placeholders/Amphibians.png';
import BirdsPNG from '@eeacms/volto-n2k/icons/placeholders/Birds.png';
import ConifersPNG from '@eeacms/volto-n2k/icons/placeholders/Conifers.png';
import FernsPNG from '@eeacms/volto-n2k/icons/placeholders/Ferns.png';
import FishesPNG from '@eeacms/volto-n2k/icons/placeholders/Fishes.png';
import FloweringPlantsPNG from '@eeacms/volto-n2k/icons/placeholders/Flowering Plants.png';
import FungiPNG from '@eeacms/volto-n2k/icons/placeholders/Fungi.png';
import InvertebratesPNG from '@eeacms/volto-n2k/icons/placeholders/Invertebrates.png';
import MammalsPNG from '@eeacms/volto-n2k/icons/placeholders/Mammals.png';
import MossesLiverwortsPNG from '@eeacms/volto-n2k/icons/placeholders/Mosses & Liverworts.png';
import ReptilesPNG from '@eeacms/volto-n2k/icons/placeholders/Reptiles.png';

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

export const getObjectByIndex = (provider_data, index) => {
  const obj = {};
  const keys = Object.keys(provider_data);
  keys.forEach((key) => {
    obj[key] = provider_data[key][index];
  });
  return obj;
};

export const adjustBrightness = (col, amt) => {
  var usePound = false;

  if (col[0] === '#') {
    col = col.slice(1);
    usePound = true;
  }

  let R = parseInt(col.substring(0, 2), 16);
  let G = parseInt(col.substring(2, 4), 16);
  let B = parseInt(col.substring(4, 6), 16);

  // to make the colour less bright than the input
  // change the following three "+" symbols to "-"
  R = R + amt;
  G = G + amt;
  B = B + amt;

  if (R > 255) R = 255;
  else if (R < 0) R = 0;

  if (G > 255) G = 255;
  else if (G < 0) G = 0;

  if (B > 255) B = 255;
  else if (B < 0) B = 0;

  let RR = R.toString(16).length === 1 ? '0' + R.toString(16) : R.toString(16);
  let GG = G.toString(16).length === 1 ? '0' + G.toString(16) : G.toString(16);
  let BB = B.toString(16).length === 1 ? '0' + B.toString(16) : B.toString(16);

  return (usePound ? '#' : '') + RR + GG + BB;
};

export const getN2kItems = (items) => {
  return items.filter((item) => item.url === '/natura2000')?.[0]?.items || [];
};

export const pathExists = (path, items) => {
  let ok = false;
  for (let i = 0; i < items.length; i++) {
    if (!ok && items[i].url === path) {
      ok = true;
    } else if (!ok && items[i].items?.length) {
      ok = pathExists(path, items[i].items);
    }
  }
  return ok;
};
