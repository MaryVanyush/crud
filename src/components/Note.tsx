import React from 'react';
import closeImg from '../assets/close.svg'

interface NoteProps {
  id: number;
  content: string;
  onDelete: (id: number) => void;
}

class Note extends React.Component<NoteProps> {
  render() {
    const { id, content, onDelete } = this.props;

    return (
      <div className="note">
        <p>{content}</p>
        <button onClick={() => onDelete(id)}>
            <img src={closeImg} alt="close" />
        </button>
      </div>
    );
  }
}

export default Note;