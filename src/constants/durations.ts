import { range } from 'lodash';

export const noteDurations = range(6).map(i => 2 ** i);
export const restDurations = range(5).map(i => 2 ** i);
