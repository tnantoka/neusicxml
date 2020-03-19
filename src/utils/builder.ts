import { Note } from '../constants/types';

export default class Builder {
  notes: Note[]

  constructor(notes: Note[]) {
    this.notes = notes;
  }

  events() {
    const events: any[] = [];

    this.notes.reduce((time, note) => {
      const duration = 4 / note.duration;
      if (note.isRest) {
        return time + duration;
      }

      const event = {
        time: `0:${time}:0`,
        note: note.isRest ? '' : `${note.step.step}${note.octave}`, duration: `${note.duration}n`,
        lyric: note.lyric,
      };
      events.push(event);

      return time + duration;
    }, 0);

    return events;
  }

  //buildEvents() {
  //  const events = [];
  //  const measures = [];
  //  notes.reduce((time, note) => {
  //    const duration = 4 / [8, 4, 2, 1][note.duration];
  //    const isRest = note.lyric === '休';
  //    if (isRest) {
  //      return time + duration;
  //    }

  //    const event = {
  //      time: `0:${time}:0`,
  //      note: isRest
  //        ? ''
  //        : `${'CDEFGABC'.split('')[note.index]}${note.index < 7 ? 4 : 5}`,
  //      duration: `${[8, 4, 2, 1][note.duration]}n`,
  //      lyric: note.lyric,
  //    };

  //    if (!isRest) {
  //      events.push(event);
  //    }
  //    measures.push(event);

  //    return time + duration;
  //  }, 0);

  //  return [events, measures];
  //}

}
