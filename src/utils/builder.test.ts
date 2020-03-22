import Builder from './builder';

test('events', () => {
  const notes = [
    { id: 1, step: { step: 'C', index: 0 }, octave: 4, duration: 4, lyric: 'ド', isRest: false, accidental: 'none' },
    { id: 2, step: { step: 'D', index: 1 }, octave: 4, duration: 8, lyric: 'レ', isRest: false, accidental: 'none' },
    { id: 3, step: { step: '', index: -1 }, octave: 0, duration: 8, lyric: '', isRest: true, accidental: 'none' },
    { id: 4, step: { step: 'E', index: 2 }, octave: 4, duration: 4, lyric: 'ミ', isRest: false, accidental: 'none' },
  ];
  const expected = [
    { time: '0:0:0', note: 'C4', duration: '4n', lyric: 'ド' },
    { time: '0:1:0', note: 'D4', duration: '8n', lyric: 'レ' },
    { time: '0:2:0', note: 'E4', duration: '4n', lyric: 'ミ' },
  ];
  const events = new Builder(notes).events();
  expect(events).toEqual(expected);
});

test('measures', () => {
  const notes = [
    { id: 1, step: { step: 'C', index: 0 }, octave: 4, duration: 4, lyric: 'ド', isRest: false, accidental: 'none' },
    { id: 2, step: { step: 'D', index: 1 }, octave: 4, duration: 8, lyric: 'レ', isRest: false, accidental: 'none' },
    { id: 3, step: { step: '', index: -1 }, octave: 0, duration: 8, lyric: '', isRest: true, accidental: 'none' },
    { id: 4, step: { step: 'E', index: 2 }, octave: 4, duration: 4, lyric: 'ミ', isRest: false, accidental: 'none' },
  ];
  const expected = [
    { 
      notes: [
        { pitch: { step: 'C', octave: '4' }, isRest: false, duration: 4, lyric: { text: 'ド' }, accidental: 0 },
        { pitch: { step: 'D', octave: '4' }, isRest: false, duration: 2, lyric: { text: 'レ' }, accidental: 0 },
        { pitch: { step: undefined, octave: undefined }, isRest: true, duration: 2, lyric: { text: '' }, accidental: 0 },
        { pitch: { step: 'E', octave: '4' }, isRest: false, duration: 4, lyric: { text: 'ミ' }, accidental: 0 },
        { pitch: { step: '', octave: '' }, isRest: true, duration: 1, lyric: { text: '' } },
        { pitch: { step: '', octave: '' }, isRest: true, duration: 1, lyric: { text: '' } },
        { pitch: { step: '', octave: '' }, isRest: true, duration: 1, lyric: { text: '' } },
        { pitch: { step: '', octave: '' }, isRest: true, duration: 1, lyric: { text: '' } },
      ],
    },
  ];
  const measures = new Builder(notes).measures();
  expect(measures).toEqual(expected);
});

test('xml', () => {
  const notes = [
    { id: 1, step: { step: 'C', index: 0 }, octave: 4, duration: 4, lyric: 'ド', isRest: false, accidental: 'none' },
    { id: 2, step: { step: 'D', index: 1 }, octave: 4, duration: 8, lyric: 'レ', isRest: false, accidental: 'none' },
    { id: 3, step: { step: '', index: -1 }, octave: 0, duration: 8, lyric: '', isRest: true, accidental: 'none' },
    { id: 4, step: { step: 'E', index: 2 }, octave: 4, duration: 4, lyric: 'ミ', isRest: false, accidental: 'none' },
 ];
  const xml = new Builder(notes).xml();
  const expected = `    <measure>
      <note>
        <pitch>
          <step>C</step>
          <octave>4</octave>
        </pitch>
        <lyric>
          <text>ド</text>
        </lyric>
        <duration>4</duration>
      </note>
      <note>
        <pitch>
          <step>D</step>
          <octave>4</octave>
        </pitch>
        <lyric>
          <text>レ</text>
        </lyric>
        <duration>2</duration>
      </note>
      <note>
        <rest />
        <duration>2</duration>
      </note>
      <note>
        <pitch>
          <step>E</step>
          <octave>4</octave>
        </pitch>
        <lyric>
          <text>ミ</text>
        </lyric>
        <duration>4</duration>
      </note>
      <note>
        <rest />
        <duration>1</duration>
      </note>
      <note>
        <rest />
        <duration>1</duration>
      </note>
      <note>
        <rest />
        <duration>1</duration>
      </note>
      <note>
        <rest />
        <duration>1</duration>
      </note>
    </measure>`;
  expect(xml).toMatch(expected);
});
