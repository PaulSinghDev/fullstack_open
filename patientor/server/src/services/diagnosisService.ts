import diagnoses from '../data/diagnoses';
import { Diagnose } from '../types';

const getAllDiagnosisData = (): Diagnose[] => {
  return diagnoses;
};

export default {
  getAllDiagnosisData,
};
