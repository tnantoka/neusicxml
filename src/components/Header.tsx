import React from 'react';

import { Note } from '../constants/types';

type Props = {
  onClickPlay: () => void;
  onClickDownload: () => void;
  notes: Note[];
};

export default function Header(props: Props) {
  const { onClickPlay, onClickDownload, notes } = props;

  return (
    <header className="mt-3 d-flex">
      <div>
        <h1 className="font-weight-light h4 mb-0">
          <span className="font-weight-normal">NEU</span>sicXML
        </h1>
        <p>
          <small className="text-muted">
            <a href="https://n3utrino.work/">NEUTRINO</a>に食わせるXMLを雑に作る
          </small>
        </p>
      </div>
      <div className="ml-auto mb-2">
        <button className="btn btn-outline-info mr-2" onClick={onClickPlay} disabled={notes.length < 1}>
          <i className="fas fa-play"></i>
          <span className="ml-2 d-none d-sm-inline">Play</span>
        </button>
        <button className="btn btn-outline-secondary" onClick={onClickDownload} disabled={notes.length < 1}>
          <i className="fas fa-arrow-down"></i>
          <span className="ml-2 d-none d-sm-inline">Download</span>
        </button>
      </div>
    </header>
  );
}
