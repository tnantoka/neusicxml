import React from 'react';
import { range, sample } from 'lodash';
import classnames from 'classnames';

import { dark } from '../constants/images';

const { noteImages, restImages } = dark;

const spaceHeight = 12;

export default function Score() {
  return (
    <div className="row">
      <div className="col">
        {range(2).map(i => {
          return (
            <div className="position-relative mt-4">
              {range(11).map(i => {
                return (
                  <div
                    className={classnames('w-100 border-dark', {
                      'border-bottom': i < 1 || i < 6,
                    })}
                    style={{ height: spaceHeight }}
                  ></div>
                );
              })}

              <div
                className="position-absolute d-flex"
                style={{ left: 0, top: 0, right: 0, bottom: 0 }}
              >
                {range(8).map(i => {
                  return (
                    <div
                      className={classnames(
                        'border w-100 position-relative d-flex align-items-end',
                        {
                          'border-dark': Math.random() < 0.5,
                          'border-transparent': Math.random() > 0.5,
                        }
                      )}
                    >
                      <div
                        className="position-absolute text-center"
                        style={{
                          left: 0,
                          right: 0,
                          bottom:
                            2 +
                            spaceHeight *
                              0.5 *
                              (6 + Math.floor(Math.random() * 8)),
                        }}
                      >
                        <img
                          src={
                            Math.random() < 1.0
                              ? sample(noteImages)
                              : sample(restImages)
                          }
                          height={44}
                          width={44}
                        />
                      </div>
                      <div
                        className="d-flex align-items-end"
                        style={{ height: spaceHeight * 3 }}
                      >
                        {Math.random() < 0.5 ? (
                          <input
                            type="text"
                            className="form-control form-control-sm text-center"
                          />
                        ) : (
                          <input
                            type="text"
                            className="form-control-plaintext form-control-sm text-center"
                            readOnly
                            value="test"
                          />
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
