import ejs from 'ejs';
import { range } from 'lodash';

import { Note } from '../constants/types';
import template from '../constants/template';
import accidentals from '../constants/accidentals';

export default class Builder {
  notes: Note[]
  tempo: number
  beat: number

  constructor(notes: Note[], tempo: number, beat: number) {
    this.notes = notes;
    this.tempo = tempo;
    this.beat = beat;
  }

  events(withRest = false) {
    const events: any[] = [];

    this.notes.reduce((time, note) => {
      const duration = 4 / note.duration;
      if (note.isRest && !withRest) {
        return time + duration;
      }

      const accidental = accidentals.find(accidental => accidental.name === note.accidental);

      const event = {
        time: `0:${time}:0`,
        note: note.isRest ? '' : `${note.step.step}${accidental!.symbol}${note.octave}`,
        duration: `${note.duration}n`,
        lyric: note.lyric,
      };
      events.push(event);

      return time + duration;
    }, 0);

    return events;
  }

  get beats() {
    return this.beat * 4;
  }

  measures() {
    const events = this.events(true);

    const measures: { notes: any[]}[] = [{ notes: [] }];

    events.forEach(event => {
      const duration = 16 / parseInt(event.duration);
      const prevTimes = measures[measures.length - 1].notes.reduce((result, item: any) => result + item.duration, 0);
      const times = prevTimes + duration;

      if (times > this.beats) {
        measures.push({ notes: [] });
      }

      const step = event.note.split('')[0];
      const octave = event.note.split('')[event.note.length - 1];
      const symbol = event.note.length === 3 ? event.note.split('')[1] : '';
      const accidental = accidentals.find(accidental => accidental.symbol === symbol);

      measures[measures.length - 1].notes.push({
        pitch: {
          step,
          octave,
        },
        isRest: !event.note,
        duration,
        lyric: {
          text: event.lyric,
        },
        accidental: accidental!.alter,
      });
    });

    measures.forEach(measure => {
      const times = measure.notes.reduce((result, item: any) => result + item.duration, 0);
      range(Math.floor(this.beats - times)).forEach(() => {
        measure.notes.push({
          pitch: {
            step: '',
            octave: '',
          },
          isRest: true,
          duration: 1,
          lyric: {
            text: '',
          },
        });
      });
    });

    return measures;
  }

  xml() {
    const measures = this.measures();
    const xml = ejs.render(template, { measures, tempo: this.tempo, beat: this.beat });
    return xml;
  }
}
