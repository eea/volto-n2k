import AmphibiansPNG from '@eeacms/volto-n2k/icons/placeholders/default.png';
import BirdsPNG from '@eeacms/volto-n2k/icons/placeholders/Birds.png';
import ConifersPNG from '@eeacms/volto-n2k/icons/placeholders/Conifers.png';
import FernsPNG from '@eeacms/volto-n2k/icons/placeholders/default.png';
import FishesPNG from '@eeacms/volto-n2k/icons/placeholders/Fishes.png';
import FloweringPlantsPNG from '@eeacms/volto-n2k/icons/placeholders/default.png';
import FungiPNG from '@eeacms/volto-n2k/icons/placeholders/Fungi.png';
import InvertebratesPNG from '@eeacms/volto-n2k/icons/placeholders/default.png';
import MammalsPNG from '@eeacms/volto-n2k/icons/placeholders/default.png';
import MossesLiverwortsPNG from '@eeacms/volto-n2k/icons/placeholders/default.png';
import ReptilesPNG from '@eeacms/volto-n2k/icons/placeholders/default.png';
import AlgaePNG from '@eeacms/volto-n2k/icons/placeholders/Algae.png';
import PlantsPNG from '@eeacms/volto-n2k/icons/placeholders/default.png';
import defaultPNG from '@eeacms/volto-n2k/icons/placeholders/default.png';

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
  Algae: AlgaePNG,
  Plants: PlantsPNG,
  default: defaultPNG,
};

export const getObjectByIndex = (provider_data, index) => {
  const obj = {};
  const keys = Object.keys(provider_data);
  keys.forEach((key) => {
    obj[key] = provider_data[key][index];
  });
  return obj;
};

export function sortBy(obj, property, order = 'ASC') {
  return Object.keys(obj)
    .sort((a, b) =>
      order === 'ASC'
        ? obj[a][property] - obj[b][property]
        : obj[b][property] - obj[a][property],
    )
    .reduce((newObj, key) => {
      newObj[key] = { ...obj[key] };
      return newObj;
    }, {});
}

export const componentToHex = (c) => {
  var hex = parseInt(c).toString(16);
  return hex.length === 1 ? '0' + hex : hex;
};

function hexToRgb(hex) {
  var result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  return result
    ? [
        parseInt(result[1], 16),
        parseInt(result[2], 16),
        parseInt(result[3], 16),
      ]
    : [0, 0, 0];
}

export const getContrastColor = (rgb) => {
  if (rgb.includes('rgb(')) {
    rgb = rgb
      .substring(4, rgb.length - 1)
      .replace(/ /g, '')
      .split(',');
  } else if (rgb[0] === '#') {
    rgb = hexToRgb(rgb);
  }
  const brightness = Math.round(
    (parseInt(rgb[0]) * 299 + parseInt(rgb[1]) * 587 + parseInt(rgb[2]) * 114) /
      1000,
  );

  return brightness > 125 ? 'rgb(0, 0, 0)' : 'rgb(255, 255, 255)';
};

export const adjustBrightness = (col, amt) => {
  var usePound = false;

  if (col.includes('rgb(')) {
    const rgb = col
      .substring(4, col.length - 1)
      .replace(/ /g, '')
      .split(',');
    col =
      '#' +
      componentToHex(rgb[0]) +
      componentToHex(rgb[1]) +
      componentToHex(rgb[2]);
  }

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

export const replaceQueryParam = (url, param, newValue) => {
  const regex = new RegExp(`(${encodeURIComponent(param)}=)([^&]+)`, 'i');
  return url.replace(regex, `$1${encodeURIComponent(newValue)}`);
};
