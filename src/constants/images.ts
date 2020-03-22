import accidentals from './accidentals';
import { noteDurations, restDurations } from './durations';
const loadImage = (path: string) => require(`../images/${path}.png`);

const lightNoteImages: any[] = noteDurations.map(i =>
  loadImage(`light/note${i}`)
);
const lightRestImages: any[] = restDurations.map(i =>
  loadImage(`light/rest${i}`)
);
const lightAccidentalImages: any[] = accidentals.map(accidental =>
  loadImage(`light/${accidental.name}`)
);

const darkNoteImages: any[] = noteDurations.map(i =>
  loadImage(`dark/note${i}`)
);
const darkRestImages: any[] = restDurations.map(i =>
  loadImage(`dark/rest${i}`)
);
const darkAccidentalImages: any[] = accidentals.map(accidental =>
  loadImage(`dark/${accidental.name}`)
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
