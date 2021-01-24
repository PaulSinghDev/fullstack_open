import express from 'express';
import patientsService from '../services/patientService';
import toNewPatient from '../utils/patient';

const patientsRouter = express.Router();

patientsRouter.get('/', (_req, res) => {
  res.send(patientsService.getNonSensitivePatientData());
});

patientsRouter.post('/', (req, res) => {
  try {
    console.log(req.body);
    const newPatient = toNewPatient(req.body);
    const addedPatient = patientsService.addPatient(newPatient);

    res.send(addedPatient);
  } catch (error) {
    res.status(400).send(error.message);
  }
});

export default patientsRouter;
