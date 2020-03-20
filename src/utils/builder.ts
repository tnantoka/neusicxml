import ejs from 'ejs';
import { range } from 'lodash';

import { Note } from '../constants/types';
import template from '../constants/template';

export default class Builder {
  notes: Note[]

  constructor(notes: Note[]) {
    this.notes = notes;
  }

  events(withRest = false) {
    const events: any[] = [];

    this.notes.reduce((time, note) => {
      const duration = 4 / note.duration;
      if (note.isRest && !withRest) {
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

  measures() {
    const events = this.events(true);

    const measures: { notes: any[]}[] = [{ notes: [] }];

    events.forEach(event => {
      const duration = 16 / parseInt(event.duration);
      const prevTimes = measures[measures.length - 1].notes.reduce((result, item: any) => result + item.duration, 0);
      const times = prevTimes + duration;

      if (times > 16) {
        measures.push({ notes: [] });
      }

      measures[measures.length - 1].notes.push({
        pitch: {
          step: event.note.split('')[0],
          octave: event.note.split('')[1],
        },
        isRest: !event.note,
        duration,
        lyric: {
          text: event.lyric,
        },
      });
    });

    measures.forEach(measure => {
      const times = measure.notes.reduce((result, item: any) => result + item.duration, 0);
      range(Math.floor(16 - times)).forEach(() => {
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
    const xml = ejs.render(template, { measures });
    return xml;
  }
}
