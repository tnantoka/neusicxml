import { Step } from './types';

const steps: Step[] = 'CDEFGABC'.split('').map((step, index) => ({ step, index }));
export default steps;
