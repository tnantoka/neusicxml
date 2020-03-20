import React from 'react';
import { range, sample, chunk } from 'lodash';
import classnames from 'classnames';

import { dark } from '../constants/images';
import { Note } from '../constants/types';
import { noteDurations, restDurations } from '../constants/durations';

const { noteImages, restImages } = dark;

const spaceHeight = 12;

type Props = {
  notes: Note[];
  selectedNote: Note | null;
  onSelect: (note: Note) => void;
  editingNote: Note | null;
  onEdit: (note: Note) => void;
  onDelete: (note: Note) => void;
  onChangeLyric: (lyric: string) => void;
  onClear: () => void;
};

function Lines() {
  return (
    <>
      {range(13).map(i => {
        return (
          <div
            key={i}
            className={classnames('w-100 border-dark', {
              'border-bottom': i > 1 && i < 8,
            })}
            style={{ height: spaceHeight }}
          ></div>
        );
      })}
    </>
  );
}

export default function Score(props: Props) {
  const { notes, selectedNote, onSelect, editingNote, onEdit, onDelete, onChangeLyric, onClear } = props;

  return (
    <>
      <div className="row">
        <div className="col">
          {notes.length < 1 && (
            <div className="position-relative mt-4">
              <Lines />
            </div>
          )}
          {chunk(notes, 8).map((chunkedNotes, i) => {
            return (
              <div className="position-relative mt-4" key={i}>
                <Lines />
                <div
                  className="position-absolute d-flex"
                  style={{ left: 0, top: 0, right: 0, bottom: 0 }}
                >
                  {chunkedNotes.map((note, j) => {
                    const isSelected = note.id === selectedNote?.id;
                    const isEditing = note.id === editingNote?.id;
                    const onClickLyric = (e: any) => {
                      e.stopPropagation();
                      if (isEditing) {
                        return;
                      }
                      e.target.select();
                      onEdit(note)
                    };
   
                    return (
                      <div
                        className={classnames(
                          'border w-100 position-relative d-flex align-items-end', {
                            'border-dark': isSelected,
                            'border-transparent': !isSelected,
                          }
                        )}
                        key={note.id}
                        onClick={() => onSelect(note)}
                      >
                        {isSelected && (
                          <button
                            className="btn btn-dark btn-sm position-absolute px-1 py-0"
                            style={{ top: 0, right: 0 }}
                            onClick={() => onDelete(note)}
                            tabIndex={-1}
                          >
                            <i className="fas fa-times"></i>
                          </button>
                        )}

                        <div
                          className="position-absolute text-center"
                          style={{
                            left: 0,
                            right: 0,
                            bottom:
                              2 +
                              spaceHeight *
                                0.5 * (6 + (note.isRest ? 6 : note.step.index)),
                          }}
                        >
                          <img
                            src={(note.isRest ? restImages : noteImages)[noteDurations.indexOf(note.duration)]}
                            height={44}
                            width={44}
                          />
                        </div>
                        <div
                          className="d-flex align-items-end"
                          style={{ height: spaceHeight * 3 }}
                        >
                          <input
                            type="text"
                            className={classnames('form-control-sm text-center', {
                              'form-control': isEditing,
                              'form-control-plaintext': !isEditing,
                            })}
                            onClick={onClickLyric}
                            onFocus={onClickLyric}
                            value={note.lyric}
                            onChange={e => onChangeLyric(e.target.value)}
                          />
                        </div>
                      </div>
                    );
                  })}
                  {range(8 - chunkedNotes.length).map(j => {
                    return (
                      <div
                        className="w-100"
                        key={j}
                      />
                    );
                  })}
                </div>
              </div>
            );
          })}
        </div>
      </div>
      <div className="row">
        <div
          className="col text-right"
        >
          <button className="btn btn-outline-danger btn-sm" onClick={onClear} disabled={notes.length < 1}>Clear</button>
        </div>
      </div>
    </>
  );
}
