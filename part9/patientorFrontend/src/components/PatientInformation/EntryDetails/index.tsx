import { Entry, Diagnosis } from "../../../types";

import LocalHospitalIcon from '@mui/icons-material/LocalHospital';
import WorkIcon from '@mui/icons-material/Work';
import FavoriteIcon from '@mui/icons-material/Favorite';

interface Props {
    entry: Entry;
}

const HospitalEntry = ({ entry }: Props) => {
    return (
        <div>
            <h3>{entry.date} <LocalHospitalIcon /></h3>
            <p><i>{entry.description}</i></p>
            <p>Diagnosis by: <strong>{entry.specialist}</strong></p>
        </div>
    );
};

// <div key={e.date}>
//   <p><strong>{e.date}</strong> - {e.description}</p>
//   <ul>
//     {!e.diagnosisCodes ? 'No diagnosis codes.' : e.diagnosisCodes.map(c => <li key={c}><strong>{c}</strong>: {findDiagnosis(c)}</li>)}
//   </ul>
// </div>

const OccupationalEntry = ({ entry }: Props ) => {
    return (
        <div>
            <h3>{entry.date} <WorkIcon /></h3>
            <p><i>{entry.description}</i></p>
            <p>Diagnosis by: <strong>{entry.specialist}</strong></p>
        </div>
    );
};

const HealthCheckEntry = ({ entry }: Props) => {
    let style = {color: 'red'};
    if(entry.healthCheckRating === 0){
        style = {color: 'green'};
    }
    else if(entry.healthCheckRating === 1){
        style = {color: 'yellow'};
    }
    else if(entry.healthCheckRating === 2){
        style = {color: 'orange'};
    }
    else{
        style = {color: 'red'};
    }
    return (
        <div>
            <h3>{entry.date} <FavoriteIcon /></h3>
            <p><i>{entry.description}</i></p>
            <FavoriteIcon style={style} />
            <p>Diagnosis by: <strong>{entry.specialist}</strong></p>
        </div>
    );
};

/**
 * Helper function for exhaustive type checking
 */
const assertNever = (value: never): never => {
  throw new Error(
    `Unhandled discriminated union member: ${JSON.stringify(value)}`
  );
};

const EntryDetails: React.FC<{ entry: Entry }> = ({ entry }) => {
    switch(entry.type){
        case "Hospital":
            return <HospitalEntry entry={entry} />;
        case "OccupationalHealthcare":
            return <OccupationalEntry entry={entry} />;
        case "HealthCheck":
            return <HealthCheckEntry entry={entry} />
        default:
            return assertNever(entry);
    }
};

export default EntryDetails;