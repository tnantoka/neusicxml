import { range } from 'lodash';

const loadImage = (path: string) => require(`../images/${path}.png`);

const lightNoteImages: any[] = range(6).map(i =>
  loadImage(`light/note${2 ** i}`)
);
const lightRestImages: any[] = range(5).map(i =>
  loadImage(`light/rest${2 ** i}`)
);
const lightAccidentalImages: any[] = ['flat', 'natural', 'sharp'].map(name =>
  loadImage(`light/${name}`)
);

const darkNoteImages: any[] = range(6).map(i =>
  loadImage(`dark/note${2 ** i}`)
);
const darkRestImages: any[] = range(5).map(i =>
  loadImage(`dark/rest${2 ** i}`)
);
const darkAccidentalImages: any[] = ['flat', 'natural', 'sharp'].map(name =>
  loadImage(`dark/${name}`)
);

export const light = {
  noteImages: lightNoteImages,
  restImages: lightRestImages,
  accidentalImages: lightAccidentalImages,
};

export const dark = {
  noteImages: darkNoteImages,
  restImages: darkRestImages,
  accidentalImages: darkAccidentalImages,
};
