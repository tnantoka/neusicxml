import React from 'react';

import { Note } from '../constants/types';
import demos from '../constants/demos';

type Props = {
};

export default function Help(props: Props) {
  return (
    <div className="mt-4">
      <div className="card">
        <div className="card-header">
          Help
        </div>
        <ul className="list-group list-group-flush">
        </ul>
      </div>
    </div>
  );
}
