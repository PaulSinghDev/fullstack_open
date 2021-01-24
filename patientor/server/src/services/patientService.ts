import patients from '../data/patients';
import {
  PatientEntry,
  NonSensitivePatientEntry,
  NewPatientObject,
} from '../types';

const getAllPatients = (): Array<PatientEntry> => patients;

const getNonSensitivePatientData = (): NonSensitivePatientEntry[] =>
  patients.map(({ id, name, dateOfBirth, gender, occupation }) => ({
    id,
    name,
    dateOfBirth,
    gender,
    occupation,
  }));

const addPatient = (object: NewPatientObject): PatientEntry => {
  const newPatient = {
    ...object,
    id: Math.random().toString(36).substr(7),
  };
  return newPatient;
};
export default {
  getAllPatients,
  getNonSensitivePatientData,
  addPatient,
};
