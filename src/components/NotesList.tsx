import React from 'react';
import Note from './Note';

interface Notes {
  id: number;
  content: string;
}

interface NotesListProps {
  notes: Notes[];
  onDelete: (id: number) => void;
}

class NotesList extends React.Component<NotesListProps> {
  render() {
    const { notes, onDelete } = this.props;

    return (
      <div className='notes-list'>
        {notes.map((note) => (
          <Note key={note.id} {...note} onDelete={onDelete} />
        ))}
      </div>
    );
  }
}

export default NotesList;