import React from 'react';

export default function Keyboard() {
  return (
    <div className="row">
      <div className="col">
        <div className="btn-group btn-group-lg w-100">
          {['ド', 'レ', 'ミ', 'ファ', 'ソ', 'ラ', 'シ', 'ド'].map((key, i) => (
            <button
              key={i}
              type="button"
              className="btn btn-outline-secondary pb-2 py-5 px-1"
            >
              {key}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
