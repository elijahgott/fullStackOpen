import patientData from '../../data/patients';
import { Patient, NonSensitivePatient, NewPatient } from '../types';
import { v1 as uuid } from 'uuid';

const patients : Patient[] = patientData;

const getEntries = () : Patient[] => {
  return patients;
};

const getEntryById = ( id: string ) : Patient | null => {
  const foundPatient = patients.find(p => p.id === id);

  return foundPatient ? foundPatient : null;
};

const getNonSensitiveEntries = () : NonSensitivePatient[] => {
  return patients.map(({ id, name, ssn, dateOfBirth, gender, occupation, entries }) => ({
    id,
    name,
    ssn,
    dateOfBirth,
    gender,
    occupation,
    entries
  }));
};

const addPatient = ( patient: NewPatient ) : Patient => {
  const newPatient = {
    id: uuid(),
    entries: [],
    ...patient
  };
  patients.push(newPatient);
  return newPatient;
};

export default { getEntries, getEntryById, getNonSensitiveEntries, addPatient };