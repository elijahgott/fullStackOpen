import express from 'express';
import { z } from 'zod';
import patientService from '../services/patients';
import toNewPatient from '../utils';

const router = express.Router();

router.get('/', (_req, res) => {
  res.send(patientService.getNonSensitiveEntries());
});

router.get('/:id', (req, res) => {
  const foundPatient = patientService.getEntryById(req.params.id);
  if(foundPatient){
    res.send(foundPatient);
  }
  else{
    res.status(404).end();
  }
});

router.post('/', (req, res) => {
  try{
    const newPatient = toNewPatient(req.body);
    const addedPatient = patientService.addPatient(newPatient);
    res.json(addedPatient);
  }
  catch(error: unknown){
    if(error instanceof z.ZodError){
      res.status(400).send({error: error.issues});
    }
    else{
      res.status(400).send({error: 'unknown error.'});
    }
  }
});

export default router;