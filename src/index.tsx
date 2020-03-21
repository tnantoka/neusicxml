import React from 'react';
import ReactDOM from 'react-dom';
import * as serviceWorker from './serviceWorker';
import '@fortawesome/fontawesome-free/css/all.css';

import './custom.scss';
import './index.css';

import App from './App';

ReactDOM.render(<App />, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();

window.addEventListener('beforeunload', (e: BeforeUnloadEvent) => {
  e.preventDefault();
  e.returnValue = '';
});
