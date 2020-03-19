import React, { useEffect } from 'react';

import { Note, Step } from '../constants/types';
import steps from '../constants/steps';
import { noteDurations, restDurations } from '../constants/durations';

type Props = {
  isAutoDuration: boolean;
  onAdd: (note: Note) => void;
  duration: number;
  autoDuration: number | null;
  onChangeAutoDuration: (autoDuration: number | null) => void;
  octave: number;
  isRest: boolean;
};

const japaneseSteps = ['ド', 'レ', 'ミ', 'ファ', 'ソ', 'ラ', 'シ', 'ド'];

export default function Keyboard(props: Props) {
  const { isAutoDuration, onAdd, duration, autoDuration, onChangeAutoDuration, octave, isRest } = props;

  const onClick = (step: Step, lyric: string) => {
    if (isAutoDuration) {
      return;
    }
    onAdd({
      id: new Date().getTime(),
      step,
      octave,
      duration,
      lyric,
      isRest,
    });
  };

  useEffect(() => {
    if (!isAutoDuration || !autoDuration) {
      return;
    }

    const index = noteDurations.indexOf(autoDuration);
    if (index < noteDurations.length - 1) {
      const timer = setTimeout(() => {
        onChangeAutoDuration(noteDurations[index + 1]);
      }, 300);
      return () => clearTimeout(timer);
    } else {
      console.log('done');
    }
  }, [isAutoDuration, autoDuration]);

  const onPointerDown = () => {
    if (!isAutoDuration) {
      return;
    }
    onChangeAutoDuration(noteDurations[0]);
  };

  const onPointerUp = (step: Step, lyric: string) => {
    if (!isAutoDuration) {
      return;
    }
    onAdd({
      id: new Date().getTime(),
      step,
      octave,
      duration: autoDuration!,
      lyric,
      isRest,
    });
    onChangeAutoDuration(null);
  };

  return (
    <div className="row">
      <div className="col">
        <div
          className="btn-group btn-group-lg w-100"
        >
          {steps.map(step => {
            const japanese = japaneseSteps[step.index];
            return (
              <button
                key={step.index}
                type="button"
                className="btn btn-outline-secondary pb-2 py-5 px-1"
                onClick={() => onClick(step, japanese)}
                onMouseDown={onPointerDown}
                onTouchStart={onPointerDown}
                onMouseUp={() => onPointerUp(step, japanese)}
                onTouchEnd={() => onPointerUp(step, japanese)}
              >
                {japanese}
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}
