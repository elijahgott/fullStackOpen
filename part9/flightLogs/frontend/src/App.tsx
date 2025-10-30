import { useState, useEffect } from 'react';

import Form from './components/Form';
import Entries from './components/Entries';

import type { Entry } from './types';
import { getAllEntries } from './services/diaryService';

function App() {
  const [entries, setEntries] = useState<Entry[]>([]);

  useEffect(() => {
    getAllEntries().then(data => {
      setEntries(data);
    })
  }, []);

  return (
    <>
      <h1>Add new entry</h1>
      <Form entries={entries} setEntries={setEntries} />
      <Entries entries={entries} />
    </>
  );
}

export default App
