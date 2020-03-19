import React, { useState } from 'react';
import { remove } from 'lodash';

import Header from './components/Header';
import Toolbar from './components/Toolbar';
import Keyboard from './components/Keyboard';
import Score from './components/Score';
import Demo from './components/Demo';
import accidentals from './constants/accidentals';
import { noteDurations } from './constants/durations';
import { Note } from './constants/types';

export default function App() {
  // Header
  const onClickPlay = () => {
    console.log('play');
  };
  const onClickDownload = () => {
    console.log('download');
  };

  // Toolbar
  const [isAutoDuration, setIsAutoDuration] = useState(false);
  const onChangeIsAutoDuration = () => {
    setIsAutoDuration(!isAutoDuration);
    setAutoDuration(null);
  };
  const [isRest, setIsRest] = useState(false);
  const onChangeIsRest = () => {
    setIsRest(!isRest);
  };
  const [duration, setDuration] = useState(noteDurations[2]);
  const [autoDuration, setAutoDuration] = useState<number | null>(null);
  const onChangeDuration = (duration: number) => {
    setDuration(duration);
  };
  const onChangeAutoDuration = (autoDuration: number | null) => {
    setAutoDuration(autoDuration);
  };

  const [accidental, setAccidental] = useState(accidentals[1]);
  const onChangeAccidental = (accidental: string) => {
    setAccidental(accidental);
  };

  const [octave, setOctave] = useState(4);
  const onChangeOctave = (octave: number) => {
    setOctave(octave);
  };

  // Keyboard
  const onAdd = (note: Note) => {
    const nextNotes = [...notes];
    if (nextNotes.length > 0) {
      nextNotes.splice(notes.indexOf(selectedNote!) + 1, 0, note);
    } else {
      nextNotes.push(note);
    }
    setNotes(nextNotes);
    setSelectedNote(note);
  }

  // Score
  const [notes, setNotes] = useState<Note[]>([]);
  const [selectedNote, setSelectedNote] = useState<Note | null>(null);
  const onSelect = (note: Note) => {
    setSelectedNote(note);
  }
  const [editingNote, setEditingNote] = useState<Note | null>(null);
  const onEdit = (note: Note) => {
    setEditingNote(note);
  }
  const onDelete = (note: Note) => {
    const selectedIndex = notes.findIndex(n => n.id === note.id);
    const nextNotes = notes.filter(n => n.id !== note.id); 
    setNotes(nextNotes);
    setTimeout(() => setSelectedNote(nextNotes[selectedIndex] || nextNotes[selectedIndex - 1] || null), 0);
  }
   
  const onChangeLyric = (lyric: string) => {
    editingNote!.lyric = lyric;
    setNotes([...notes]);
  };

  return (
    <div className="container mt-3 mb-4">
      <Header {...{ onClickPlay, onClickDownload }} />
      <Toolbar
        {...{
          isAutoDuration,
          onChangeIsAutoDuration,
          isRest,
          onChangeIsRest,
          duration,
          onChangeDuration,
          autoDuration,
          accidental,
          onChangeAccidental,
          octave,
          onChangeOctave,
        }}
      />
      <Keyboard
        {...{ isAutoDuration, onAdd, duration, autoDuration, onChangeAutoDuration, octave, isRest }}
      />
      <Score
        {...{ notes, selectedNote, onSelect, editingNote, onEdit, onDelete, onChangeLyric }}
      />
      <Demo />
      <p className="text-center mt-3">
        <small>
          (c) 2020 <a href="https://twitter.com/tnantoka">@tnantoka</a>
        </small>
      </p>
    </div>
  );
}
