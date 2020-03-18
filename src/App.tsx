import React from 'react';

import Header from './components/Header';
import Toolbar from './components/Toolbar';
import Keyboard from './components/Keyboard';
import Score from './components/Score';
import Demo from './components/Demo';

export default function App() {
  return (
    <div className="container mt-3 mb-4">
      <Header />
      <Toolbar />
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
