import React from 'react';

import { Note } from '../constants/types';
import demos from '../constants/demos';

type Props = {
  onLoad: (notes: Note[], beat: number) => void;
};

export default function Demo(props: Props) {
  const { onLoad } = props;

  return (
    <div className="mt-3">
      <div className="card">
        <div className="card-header">
          Demo
        </div>
        <ul className="list-group list-group-flush">
          {demos.map(demo => {
            return (
              <li
                className="list-group-item d-flex justify-content-between align-items-center"
                key={demo.name}
              >
                <div className="d-flex align-items-center">
                  {demo.label}
                  <button type="button" className="btn btn-link ml-1" onClick={() => onLoad(demo.notes, demo.beat)}>
                    <i className="far fa-edit"></i>
                  </button>
                </div>
                <div>
                  <audio src={`/sounds/${demo.name}.mp3`} controls />
                </div>
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
}
