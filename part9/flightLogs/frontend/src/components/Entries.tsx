import EntryComponent from "./EntryComponent";
import type { EntriesProps } from '../types';

const Entries = ({ entries }: EntriesProps) => {
  return(
    <>
      <h1>Diary Entries:</h1>
      {entries.map(e => {
        return <EntryComponent key={e.id} entry={e} />
      })}
      
    </>
  );
};

export default Entries;