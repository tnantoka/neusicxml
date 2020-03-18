import React, { useState } from 'react';

import Header from './components/Header';
import Toolbar from './components/Toolbar';
import Keyboard from './components/Keyboard';
import Score from './components/Score';
import Demo from './components/Demo';
import accidentals from './constants/accidentals';
import { noteDurations } from './constants/durations';

export default function App() {
  // Header
  const onClickPlay = () => {
    console.log('play');
  };
  const onClickDownload = () => {
    console.log('download');
  };

  // Toolbar
  const [isAutoDuration, setIsAutoDuration] = useState(false);
  const onChangeIsAutoDuration = () => {
    setIsAutoDuration(!isAutoDuration);
  };
  const [isRest, setIsRest] = useState(false);
  const onChangeIsRest = () => {
    setIsRest(!isRest);
  };
  const [duration, setDuration] = useState(noteDurations[2]);
  const [autoDuration, setAutoDuration] = useState<number | null>(null);
  const onChangeDuration = (duration: number) => {
    setDuration(duration);
  };

  const [accidental, setAccidental] = useState(accidentals[1]);
  const onChangeAccidental = (accidental: string) => {
    setAccidental(accidental);
  };

  const [octave, setOctave] = useState(4);
  const onChangeOctave = (octave: number) => {
    setOctave(octave);
  };

  return (
    <div className="container mt-3 mb-4">
      <Header {...{ onClickPlay, onClickDownload }} />
      <Toolbar
        {...{
          isAutoDuration,
          onChangeIsAutoDuration,
          isRest,
          onChangeIsRest,
          duration,
          onChangeDuration,
          autoDuration,
          accidental,
          onChangeAccidental,
          octave,
          onChangeOctave,
        }}
      />
      <Keyboard />
      <Score />
      <Demo />
      <p className="text-center mt-3">
        <small>
          (c) 2020 <a href="https://twitter.com/tnantoka">@tnantoka</a>
        </small>
      </p>
    </div>
  );
}
