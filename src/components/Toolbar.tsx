import React from 'react';
import { reverse } from 'lodash';
import classnames from 'classnames';

import { light } from '../constants/images';

const { noteImages, restImages, accidentalImages } = light;

export default function Header() {
  return (
    <div className="row">
      <div className="col-sm-5 mb-3">
        <div className="d-flex">
          長さ
          <label className="ml-auto">
            <input type="checkbox" />
            <label className="ml-2">自動</label>
          </label>
          <label className="ml-2">
            <input type="checkbox" />
            <label className="ml-2">休符</label>
          </label>
        </div>
        <div>
          <div className="btn-group btn-group-sm w-100">
            {reverse(noteImages).map((image, i) => (
              <button
                key={i}
                type="button"
                className={classnames('btn btn-secondary pb-2', {
                  active: Math.random() < 0.8,
                })}
              >
                <img src={image} width={20} height={20} />
              </button>
            ))}
            {false &&
              reverse(restImages).map((image, i) => (
                <button
                  key={i}
                  type="button"
                  className={classnames('btn btn-secondary pb-2', {
                    active: Math.random() < 0.8,
                  })}
                >
                  <img src={image} width={20} height={20} />
                </button>
              ))}
          </div>
        </div>
      </div>

      <div className="col-sm-4 mb-3">
        <div className="mb-3">変化</div>
        <div>
          <div className="btn-group btn-group-sm w-100">
            {accidentalImages.map((image, i) => (
              <button
                key={i}
                type="button"
                className={classnames('btn btn-secondary pb-2', {
                  active: Math.random() < 0.8,
                })}
              >
                <img src={image} width={20} height={20} />
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="col-sm-3 mb-3">
        <div className="d-flex mb-4">
          高さ
          <span className="ml-auto">0</span>
        </div>
        <div>
          <input
            type="range"
            className="custom-range"
            min="-5"
            max="5"
            value="0"
          />
        </div>
      </div>
    </div>
  );
}
