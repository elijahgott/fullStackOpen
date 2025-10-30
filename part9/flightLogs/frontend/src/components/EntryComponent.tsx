import type { EntryProps } from '../types';

const EntryComponent = ({ entry }: EntryProps) => {
  return (
    <div>
      <h2>{entry.date}</h2>
      <p>visibility: {entry.visibility}</p>
      <p>weather: {entry.weather}</p>
    </div>
  );
};

export default EntryComponent;