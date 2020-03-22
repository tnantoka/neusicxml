export type Step = {
  step: string;
  index: number;
  octave: number;
};
  
export type Note = {
  id: number;
  step: Step;
  octave: number;
  duration: number;
  lyric: string;
  isRest: boolean;
  accidental: string;
};
