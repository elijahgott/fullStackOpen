import { z } from 'zod';
import { NewPatient, Gender } from "./types";

// const isString = (text: unknown): text is string => {
//   return typeof text === 'string' || text instanceof String;
// };

// const parseName = (name: unknown): string => {
//   return z.string().parse(name);
// };

// const isDate = (date: string): boolean => {
//   return Boolean(Date.parse(date));
// };

// const parseDate = (date: unknown): string => {
//   if(!isString(date) || !isDate(date)){
//     throw new Error('Incorrect or missing date.');
//   }
//   return date;
// };

// const parseSsn = (ssn: unknown): string => {
//   return z.string().parse(ssn);
// };

// const isGender = (param: string): param is Gender => {
//   return Object.values(Gender).map(v => v.toString()).includes(param);
// };

// const parseGender = (gender: unknown): Gender => {
//   if(!isString(gender) || !isGender(gender)){
//     throw new Error('Incorrect or missing gender.');
//   }
//   return gender;
// };

// const parseOccupation = (occupation: unknown): string => {
//   return z.string().parse(occupation);
// };

const newPatientSchema = z.object({
  name: z.string(),
  dateOfBirth: z.string().date(),
  ssn: z.string(),
  gender: z.nativeEnum(Gender),
  occupation: z.string()
});

const toNewPatient = (object: unknown): NewPatient => {
  // if(!object || typeof object !== 'object'){
  //   throw new Error('Incorrect or missing data.');
  // }

  // if('name' in object && 'dateOfBirth' in object && 'ssn' in object && 'gender' in object && 'occupation' in object){
  //   const newPatient: NewPatient = {
  //     name: z.string().parse(object.name),
  //     dateOfBirth: z.string().date().parse(object.dateOfBirth),
  //     ssn: z.string().parse(object.ssn),
  //     gender: z.nativeEnum(Gender).parse(object.gender),
  //     occupation: z.string().parse(object.occupation)
  //   };
  //   return newPatient;
  // }

  // throw new Error('Incorrect data: some fields are missing.');
  return newPatientSchema.parse(object);
};

export default toNewPatient;