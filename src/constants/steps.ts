import { Step } from './types';

const steps: Step[] = 'CDEFGABCDEFGAB'.split('').map((step, index) => ({ step, index, octave: 4 + Math.floor(index / 7) }));
export default steps;
