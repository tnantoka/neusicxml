import React from 'react';

export default function Demo() {
  return (
    <div className="mt-3">
      <ul className="list-group">
        {['こいのぼり', 'きらきらぼし'].map(name => {
          return (
            <li className="list-group-item d-flex justify-content-between align-items-center">
              {name}
              <div>
                <button type="button" className="btn btn-link">
                  <i className="fas fa-play"></i>
                </button>
                <button type="button" className="btn btn-link ml-2">
                  <i className="fas fa-pen"></i>
                </button>
                <button type="button" className="btn btn-link ml-2">
                  <i className="fas fa-arrow-down"></i>
                </button>
              </div>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
