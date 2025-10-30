export interface Entry {
  id: string,
  date: string,
  weather: string,
  visibility: string
}

export type NewEntry = Omit<Entry, 'id'>

export interface EntriesProps {
  entries: Entry[]
}

export interface EntryProps {
  entry: Entry
}

export interface FormProps {
  entries: Entry[],
  setEntries: React.Dispatch<React.SetStateAction<Entry[]>>
}