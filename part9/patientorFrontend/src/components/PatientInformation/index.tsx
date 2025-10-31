import { Patient } from "../../types";
import { useParams } from "react-router-dom";
import MaleIcon from '@mui/icons-material/Male';
import FemaleIcon from '@mui/icons-material/Female';
import QuestionMarkIcon from '@mui/icons-material/QuestionMark';

interface Props {
  patients: Patient[];
}

const PatientInformation = ({patients}: Props) => {
  const id = useParams().id;
  const foundPatient = patients.find(p => p.id === id);

  return foundPatient ?
  (
    <>
      <h1>
        {foundPatient.name}
        {foundPatient.gender === 'male' ? <MaleIcon />
        : foundPatient.gender === 'female' ? <FemaleIcon /> : <QuestionMarkIcon />}
      </h1>
      <p>Birthday: {foundPatient.dateOfBirth}</p>
      <p>Occupation: {foundPatient.occupation}</p>
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