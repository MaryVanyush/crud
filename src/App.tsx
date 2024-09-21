import './App.css';
import React from 'react';
import NotesList from './components/NotesList';
import update from './assets/update.svg';
import add from './assets/add.svg'

interface Note {
  id: number;
  content: string;
}

interface State {
  notes: Note[];
  newNoteContent: string;
}

class App extends React.Component<object, State> {
  constructor(props: object) {
    super(props);
    this.state = {
      notes: [],
      newNoteContent: '',
    };
  }

  componentDidMount() {
    this.fetchNotes();
  }

  fetchNotes = async () => {
    const response = await fetch('http://localhost:7070/notes');
    const data = await response.json();
    this.setState({ notes: data });
  };

  addNote = async () => {
    const { newNoteContent } = this.state;

    if (!newNoteContent) return;

    await fetch('http://localhost:7070/notes', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ id: 0, content: newNoteContent }),
    });

    this.setState({ newNoteContent: '' });
    this.fetchNotes();
  };

  deleteNote = async (id: number) => {
    await fetch(`http://localhost:7070/notes/${id}`, {
      method: 'DELETE',
  });
    this.fetchNotes();
  };

  refreshNotes = () => {
    this.fetchNotes();
  };

  handleInputChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    this.setState({ newNoteContent: event.target.value });
  };

  render() {
    const { notes, newNoteContent } = this.state;

    return (
      <div>
        <div className='header'>
          <h1>Notes</h1>
          <button onClick={this.refreshNotes}><img src={update} alt="update" /></button>
        </div>
        <NotesList notes={notes} onDelete={this.deleteNote} />
      <textarea
          value={newNoteContent}
          onChange={this.handleInputChange}
        />
        <button className='add-btn' onClick={this.addNote}><img src={add} alt="add" /></button>
      </div>
    );
  }
}

export default App;