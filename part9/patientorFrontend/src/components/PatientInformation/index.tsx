import { Patient, Diagnosis } from "../../types";
import { useParams } from "react-router-dom";
import MaleIcon from '@mui/icons-material/Male';
import FemaleIcon from '@mui/icons-material/Female';
import QuestionMarkIcon from '@mui/icons-material/QuestionMark';

import EntryDetails from "./EntryDetails";

interface Props {
  patients: Patient[];
  diagnoses: Diagnosis[];
}

const PatientInformation = ({patients, diagnoses}: Props) => {
  const id = useParams().id;
  const foundPatient = patients.find(p => p.id === id);

  // const findDiagnosis = (code: string): string | null => {
  //   const diagnosis = diagnoses.find(d => d.code === code);
  //   if(!diagnosis) return null;
  //   return `${diagnosis.name}`;
  // }

  return foundPatient ?
  (
    <>
      <h1>
        {foundPatient.name}
        {foundPatient.gender === 'male' ? <MaleIcon />
        : foundPatient.gender === 'female' ? <FemaleIcon /> : <QuestionMarkIcon />}
      </h1>
      <p>SSN: {foundPatient.ssn}</p>
      <p>Birthday: {foundPatient.dateOfBirth}</p>
      <p>Occupation: {foundPatient.occupation}</p>
      <h2>Entries:</h2>
      
      {foundPatient.entries.length === 0 ? 'Patient has no entries.'
      :
        (
          <>
            {foundPatient.entries.map(e => {
              return(
                <EntryDetails key={e.date} entry={e} />
              )
            })}
          </>
          
        )
      }
    </>
  )
  :
  (
    <>
      <h1>Unable to find patient with that ID.</h1>
    </>
  );
};

export default PatientInformation;