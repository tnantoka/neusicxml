import { range, reverse } from 'lodash';

export const noteDurations = reverse(range(6).map(i => 2 ** i)).slice(1);
export const restDurations = reverse(range(5).map(i => 2 ** i));
