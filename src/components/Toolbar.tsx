import React from 'react';
import classnames from 'classnames';
import { UncontrolledTooltip } from 'reactstrap';

import { light } from '../constants/images';
import accidentals from '../constants/accidentals';
import { noteDurations, restDurations } from '../constants/durations';

const { noteImages, restImages, accidentalImages } = light;

type Props = {
  isAutoDuration: boolean;
  onChangeIsAutoDuration: () => void;
  isRest: boolean;
  duration: number;
  autoDuration: number | null;
  onChangeDuration: (duration: number) => void;
  onChangeIsRest: () => void;
  accidental: string;
  onChangeAccidental: (accidental: string) => void;
  octave: number;
  onChangeOctave: (octave: number) => void;
};

export default function Header(props: Props) {
  const {
    isAutoDuration,
    onChangeIsAutoDuration,
    isRest,
    onChangeIsRest,
    duration,
    autoDuration,
    onChangeDuration,
    accidental,
    onChangeAccidental,
    octave,
    onChangeOctave,
  } = props;

  return (
    <div className="row">
      <div className="col-sm-12 mb-3">
        <div className="d-flex">
          長さ
          <label className="ml-auto">
            <input
              type="checkbox"
              onChange={onChangeIsAutoDuration}
              checked={isAutoDuration}
            />
            <UncontrolledTooltip placement="top" target="isAutoDuration">
              鍵盤ボタンを押す長さで変わります
            </UncontrolledTooltip>
            <span className="ml-2">
              自動
              <i className="far fa-question-circle ml-1 text-muted" id="isAutoDuration"></i>
            </span>
          </label>
          <label className="ml-2">
            <input type="checkbox" onChange={onChangeIsRest} checked={isRest} />
            <span className="ml-2">休符</span>
          </label>
        </div>
        <div>
          <div className="btn-group btn-group-sm w-100">
            {!isRest
              ? noteImages.map(
                  (image, i) => (
                    <button
                      key={i}
                      type="button"
                      className={classnames('btn btn-secondary pb-2', {
                        active: noteDurations[i] === duration,
                        'bg-dark':
                          isAutoDuration && noteDurations[i] === autoDuration,
                      })}
                      onClick={() => onChangeDuration(noteDurations[i])}
                      disabled={isAutoDuration}
                    >
                      <img src={image} width={20} height={20} />
                    </button>
                  )
                )
              : restImages.map((image, i) => (
                  <button
                    key={i}
                    type="button"
                    className={classnames('btn btn-secondary pb-2', {
                      active: restDurations[i] === duration,
                      'bg-dark':
                        isAutoDuration && noteDurations[i] === autoDuration,
                    })}
                    onClick={() => onChangeDuration(restDurations[i])}
                    disabled={isAutoDuration}
                  >
                    <img src={image} width={20} height={20} />
                  </button>
                ))}
          </div>
        </div>
      </div>

      {false && (<div className="col-sm-4 mb-3">
        <div className="mb-2">変化</div>
        <div>
          <div className="btn-group btn-group-sm w-100">
            {accidentalImages.map((image, i) => (
              <button
                key={i}
                type="button"
                className={classnames('btn btn-secondary pb-2', {
                  active: accidentals[i] === accidental,
                })}
                onClick={() => onChangeAccidental(accidentals[i])}
              >
                <img src={image} width={20} height={20} />
              </button>
            ))}
          </div>
        </div>
      </div>)}

      {false && (
        <div className="col-sm-6 mb-3">
          <div className="d-flex mb-4">
            高さ
            <span className="ml-auto">{octave}</span>
          </div>
          <div>
            <input
              type="range"
              className="custom-range"
              min="3"
              max="5"
              value={octave}
              onChange={(e: any) => onChangeOctave(parseInt(e.target.value))}
            />
          </div>
        </div>
      )}
    </div>
  );
}
