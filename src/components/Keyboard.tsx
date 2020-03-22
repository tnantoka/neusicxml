import React, { useEffect } from 'react';
import { chunk } from 'lodash';
import classnames from 'classnames';

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
  accidental: string;
};

const japaneseSteps = ['ド', 'レ', 'ミ', 'ファ', 'ソ', 'ラ', 'シ'];

export default function Keyboard(props: Props) {
  const { isAutoDuration, onAdd, duration, autoDuration, onChangeAutoDuration, octave, isRest, accidental } = props;

  const onClick = (step: Step, lyric: string) => {
    if (isAutoDuration) {
      return;
    }
    onAdd({
      id: new Date().getTime(),
      step,
      octave: step.octave,
      duration,
      lyric,
      isRest,
      accidental,
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
      octave: step.octave,
      duration: autoDuration!,
      lyric,
      isRest,
      accidental,
    });
    onChangeAutoDuration(null);
  };

  return (
    <div className="row">
      {chunk(steps, 7).map((chunkedSteps, i) => {
        return (
          <div className="col-sm-6 mb-2" key={i}>
            <div
              className="btn-group btn-group-lg w-100"
            >
              {chunkedSteps.map(step => {
                const japanese = japaneseSteps[step.index % 7];
                const lyric = isRest ? '' : japanese;
                return (
                  <button
                    key={step.index}
                    type="button"
                    className="btn btn-outline-secondary pb-2 py-5 px-1"
                    onClick={() => onClick(step, lyric)}
                    onMouseDown={onPointerDown}
                    onTouchStart={onPointerDown}
                    onMouseUp={() => onPointerUp(step, lyric)}
                    onTouchEnd={() => onPointerUp(step, lyric)}
                  >
                    <span className={classnames({ invisible: isRest })}>{japanese}</span>
                  </button>
                );
              })}
            </div>
          </div>
        );
      })}
    </div>
  );
}
