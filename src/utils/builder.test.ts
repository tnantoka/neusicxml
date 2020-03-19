import Builder from './builder';

test('events', () => {
  const notes = [
    { id: 1, step: { step: 'C', index: 0 }, octave: 4, duration: 4, lyric: 'ド', isRest: false },
    { id: 2, step: { step: 'D', index: 1 }, octave: 4, duration: 8, lyric: 'レ', isRest: false },
    { id: 3, step: { step: 'E', index: 2 }, octave: 4, duration: 2, lyric: 'ミ', isRest: false },
  ];
  const expected = [
    { time: '0:0:0', note: 'C4', duration: '4n', lyric: 'ド' },
    { time: '0:1:0', note: 'D4', duration: '8n', lyric: 'レ' },
    { time: '0:1.5:0', note: 'E4', duration: '2n', lyric: 'ミ' },
  ];
  const events = new Builder(notes).events();
  expect(events).toEqual(expected);
});
